import React from 'react';
import { Box, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { TextareaAutosize } from '@mui/base';
import { v4 } from 'uuid';
import ButtonBase from '~/components/button/ButtonBase';
import TextInput from '~/components/input/TextInput';
import ModalBase from '~/components/modal/ModalBase';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useApisContext from '~/hooks/hookContext/useApisContext';
import TabsBase from '~/components/tabs/TabsBase';
import SelectApiInput from '~/components/input/SelectApiInput';
import CheckboxInput from '~/components/input/CheckboxInput';
import { FiSave } from 'react-icons/fi';
import { numeralCustom } from '~/utils/helpers';

const schema = yup.object({
  ma_vt: yup.string().required('Vui lòng nhập mã hàng hóa'),
  ten_vt: yup.string().required('Vui lòng nhập tên hàng hóa'),
});

function FormProduct({ open, handleClose, setLoad = () => {}, defaultValues }) {
  const { asyncPostData } = useApisContext();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          nhom_vat_tu: defaultValues.ma_nvt
            ? { ma_nvt: defaultValues.ma_nvt, ten_nvt: defaultValues.ten_nvt }
            : null,
          don_vi_tinh: defaultValues.ma_dvt
            ? { ma_dvt: defaultValues.ma_dvt, ten_dvt: defaultValues.ten_dvt }
            : null,
        }
      : {
          ma_vt: '',
          ten_vt: '',
          barcode: '',
          ten_tat: '',
          nhom_vat_tu: null,
          don_vi_tinh: null,
          gia_von: 0,
          gia_ban_le: 0,
          xuat_xu: '',
          theo_doi_lo: false,
        },
    resolver: yupResolver(schema),
  });

  const convertDataToPost = (values) => {
    const { nhom_vat_tu, don_vi_tinh, ...fields } = values;
    const result = { ...fields };
    result.ma_nvt = nhom_vat_tu?.ma_nvt;
    result.ten_nvt = nhom_vat_tu?.ten_nvt;
    result.ma_dvt = don_vi_tinh?.ma_dvt;
    result.ten_dvt = don_vi_tinh?.ten_dvt;
    return result;
  };

  // handle save
  const handleSave = async (values) => {
    const dataPost = convertDataToPost(values);
    const method = defaultValues ? 'put' : 'post';
    return await asyncPostData('dmvt', dataPost, method).then((resp) => {
      if (!resp.message) {
        handleClose();
        reset();
        setLoad((prev) => prev + 1);
      }
    });
  };

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      width="700px"
      title={`${defaultValues ? 'Chỉnh sửa' : 'Thêm'} hàng hóa`}
      actions={[
        <ButtonBase
          key={v4()}
          onClick={handleSubmit(handleSave)}
          loading={isSubmitting}
          startIcon={<FiSave style={{ fontSize: '16px' }} />}
        >
          Lưu
        </ButtonBase>,
        <ButtonBase key={v4()} variant="outlined" onClick={handleClose}>
          Hủy
        </ButtonBase>,
      ]}
    >
      <TabsBase
        tabLabels={[
          { label: 'Thông tin', id: 1 },
          { label: 'Mô tả', id: 2 },
        ]}
        tabPanels={[
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                disabled={!!defaultValues}
                label="Mã hàng hóa"
                placeholder="VD: SP0001"
                name="ma_vt"
                register={register}
                required
                errorMessage={errors?.ma_vt?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="Tên hàng hóa"
                placeholder="Tên nhận dạng"
                name="ten_vt"
                required
                register={register}
                errorMessage={errors?.ten_vt?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="Barcode"
                placeholder="13 ký tự số"
                name="barcode"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                placeholder="Tên ngắn gọn"
                label="Tên tắt"
                name="ten_tat"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="nhom_vat_tu"
                render={({ field: { onChange, value } }) => (
                  <SelectApiInput
                    label="Nhóm vật tư"
                    apiCode="dmnvt"
                    placeholder="Nhóm vật tư"
                    searchFileds={['ma_nvt', 'ten_nvt']}
                    getOptionLabel={(option) => option.ten_nvt}
                    value={value || { ma_nvt: '', ten_nvt: '' }}
                    onSelect={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="don_vi_tinh"
                render={({ field: { onChange, value } }) => (
                  <SelectApiInput
                    label="Đơn vị tính"
                    apiCode="dmdvt"
                    placeholder="Đơn vị tính"
                    searchFileds={['ma_dvt', 'ten_dvt']}
                    getOptionLabel={(option) => option.ten_dvt}
                    value={value || { ma_dvt: '', ten_dvt: '' }}
                    onSelect={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="gia_von"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Giá vốn"
                    placeholder="Giá nhập hàng hóa"
                    type="number"
                    value={numeralCustom(value).format()}
                    onChange={(e) => {
                      const number = e.target.value;
                      onChange(numeralCustom(number).value());
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="gia_ban_le"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Giá bán lẻ"
                    placeholder="Giá bán 1 đơn vị hàng hóa"
                    type="number"
                    value={numeralCustom(value).format()}
                    onChange={(e) => {
                      const number = e.target.value;
                      onChange(numeralCustom(number).value());
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="Xuất xứ"
                placeholder="VD: Việt Nam"
                name="xuat_xu"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="theo_doi_lo"
                render={({ field: { onChange, value } }) => (
                  <CheckboxInput
                    label="Theo dõi lô"
                    name="theo_doi_lo"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
          </Grid>,
          <Box>
            <TextareaAutosize
              {...register('mo_ta')}
              placeholder="Mô tả chi tiết hàng hóa"
              style={{
                width: '100%',
                border: '1px solid #ccc',
                outline: 'none',
                minHeight: '50px',
                borderRadius: '4px',
                padding: '5px',
              }}
            />
          </Box>,
        ]}
      />
    </ModalBase>
  );
}

export default FormProduct;
