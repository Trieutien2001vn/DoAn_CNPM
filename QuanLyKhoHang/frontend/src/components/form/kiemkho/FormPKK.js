import React, { useEffect } from 'react';
import ModalBase from '../../modal/ModalBase';
import ButtonBase from '../../button/ButtonBase';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { Grid } from '@mui/material';
import TextInput from '../../input/TextInput';
import useApisContext from '~/hooks/hookContext/useApisContext';
import { numeralCustom } from '~/utils/helpers';
import moment from 'moment';

export default function FormPKK({
  open,
  handleClose,
  setLoad = () => {},
  defaultValues,
  isEdit = false,
}) {
  const schema = yup.object({
    ma_pkk: yup.string().required('Vui lòng nhập mã phiếu kiểm kho'),
  });


  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues ? 
    {
        ...defaultValues,
        ngay_ct: moment(defaultValues.ngay_ct).format("YYYY-MM-DD"),
        ngay_kiem_hang: moment(defaultValues.ngay_kiem_hang).format('YYYY-MM-DD')
    }
    :
    {
        ngay_ct: moment().format('YYYY-MM-DD'),
        ngay_kiem_hang: moment().format('YYYY-MM-DD'),

    },


    resolver: yupResolver(schema),
  });
  const tonKhoSoSach = watch('ton_kho_so_sach');
  const tonKhoThucTe = watch('ton_kho_thuc_te');


  useEffect(() => {
    const chenhLech = (tonKhoThucTe || 0) - (tonKhoSoSach || 0);
    setValue('chenh_lech', chenhLech);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonKhoThucTe, tonKhoSoSach]);
  const { asyncPostData } = useApisContext();

  const handleSave = async (values) => {
    const method = isEdit ? 'put' : 'post';
    await asyncPostData('dmdvt', values, method).then((resp) => {
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
      title={`${isEdit ? 'Chỉnh sửa' : 'Thêm'} đơn vị tính`}
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextInput
            disabled={isEdit}
            label="Mã Phiếu"
            placeholder="VD: PKK0001"
            name="ma_phieu"
            register={register}
            required
            errorMessage={errors?.ma_pkk?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Kho"
            placeholder="Kho Cao Lãnh"
            name="ten_kho"
            required
            register={register}
            errorMessage={errors?.ten_pkk?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Hàng Hóa"
            placeholder="Kem"
            name="ten_vt"
            required
            register={register}
            errorMessage={errors?.ten_pkk?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Tồn Kho Sổ Sách"
            placeholder="Tồn kho sổ sách"
            name="ton_kho_so_sach"
            required
            register={register}
            errorMessage={errors?.ten_pkk?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Tồn Kho Thực Tế"
            placeholder="Tồn kho thực tế"
            name="ton_kho_thuc_te"
            required
            register={register}
            errorMessage={errors?.ten_pkk?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="chenh_lech"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                required
                label="Chênh Lệch"
                value={numeralCustom(value).format()}
                onChange={(e) => {
                  onChange(numeralCustom(e.target.value).value());
                }}
                errorMessage={errors?.chenh_lech?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Ngày Chứng Từ"
            type="date"
            placeholder="Ngày chứng từ"
            name="ngay_ct"
            register={register}
          errorMessage={errors?.ngay_ct?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Ngày Kiểm Hàng"
            type="date"
            placeholder="Ngày kiểm hàng"
            name="ngay_kiem_hang"
            register={register}
            errorMessage={errors?.ngay_kiem_hang?.message}
          />
        </Grid>
      </Grid>
    </ModalBase>
  );
}
