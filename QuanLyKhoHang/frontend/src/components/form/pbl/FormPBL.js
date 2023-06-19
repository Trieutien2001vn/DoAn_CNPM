import React, { useEffect, useState, useRef } from 'react';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiSave } from 'react-icons/fi';
import useApisContext from '~/hooks/hookContext/useApisContext';
import ModalBase from '~/components/modal/ModalBase';
import ButtonBase from '~/components/button/ButtonBase';
import moment from 'moment';
import TabsBase from '~/components/tabs/TabsBase';
import { TabPanel } from '@mui/lab';
import InfoTab from './InfoTab';
import { useForm } from 'react-hook-form';
import DetailsTab from './DetailsTab';

export default function FormPBL({
  open,
  handleClose,
  setLoad = () => {},
  defaultValues,
  isEdit = false,
}) {
  const schema = yup.object({
    kho: yup
      .object()
      .typeError('Vui lòng chọn kho')
      .required('Vui lòng chọn kho'),
    ngay_lap_phieu: yup
      .date()
      .typeError('Vui lòng ngày lập phiếu')
      .required('Vui lòng ngày lập phiếu'),
    ngay_ct: yup
      .date()
      .typeError('Vui lòng chọn ngày chứng từ')
      .required('Vui lòng chọn ngày chứng từ'),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          kho: {
            ma_kho: defaultValues?.ma_kho,
            ten_kho: defaultValues?.ten_kho,
          },
          nhan_vien: {
            ma_nv: defaultValues?.ma_nv,
            ten_nv: defaultValues?.ten_nv,
          },
          khach_hang: {
            ma_kh: defaultValues?.ma_kh,
            ten_kh: defaultValues?.ten_kh,
          },
          kenh_ban: {
            ma_kenh: defaultValues?.ma_kenh,
            ten_kenh: defaultValues?.ten_kenh,
          },
          pttt: {
            ma_pttt: defaultValues?.ma_pttt,
            ten_pttt: defaultValues?.ten_pttt,
          },
          ngay_lap_phieu: moment(defaultValues.ngay_lap_phieu).format(
            'YYYY-MM-DD'
          ),
          ngay_ct: moment(defaultValues.ngay_ct).format('YYYY-MM-DD'),
        }
      : {
          ngay_lap_phieu: moment().format('YYYY-MM-DD'),
          ngay_ct: moment().format('YYYY-MM-DD'),
        },
    resolver: yupResolver(schema),
  });
  const { asyncPostData } = useApisContext();
  const [details, setDetails] = useState(defaultValues?.details || []);
  const tabRef = useRef();

  const generateDataPost = (values) => {
    const { kho, nhan_vien, khach_hang, kenh_ban, pttt, ...data } = values;
    const result = {
      ...data,
      ma_kho: kho?.ma_kho || '',
      ten_kho: kho?.ten_kho || '',
      ma_nv: nhan_vien?.ma_nv || '',
      ten_nv: nhan_vien?.ten_nv || '',
      ma_kh: khach_hang?.ma_kh || '',
      ten_kh: khach_hang?.ten_kh || '',
      ma_kenh: kenh_ban?.ma_kenh || '',
      ten_kenh: kenh_ban?.ten_kenh || '',
      ma_pttt: pttt?.ma_pttt || '',
      ten_pttt: pttt?.ten_pttt || '',
      details,
    };
    return result;
  };

  const handleSave = async (values) => {
    const method = isEdit ? 'put' : 'post';
    const dataPost = generateDataPost(values);
    await asyncPostData('dmpbl', dataPost, method).then((resp) => {
      if (!resp.message) {
        handleClose();
        reset();
        setLoad((prev) => prev + 1);
      }
    });
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      tabRef.current?.handleChange(null, '1');
    }
  }, [errors]);

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      width="900px"
      title={`${isEdit ? 'Chỉnh sửa' : 'Tạo'} phiếu bán lẻ`}
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
          { label: 'Thông tin', value: '1' },
          { label: 'Chi tiết', value: '2' },
        ]}
        ref={tabRef}
      >
        <TabPanel value="1" sx={{ padding: '10px 0 0 0' }}>
          <InfoTab
            register={register}
            control={control}
            isEdit={isEdit}
            errors={errors}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: '10px 0 0 0' }}>
          <DetailsTab
            details={details}
            setDetails={setDetails}
            isEditMaster={isEdit}
          />
        </TabPanel>
      </TabsBase>
    </ModalBase>
  );
}
