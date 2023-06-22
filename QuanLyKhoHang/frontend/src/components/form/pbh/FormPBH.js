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
import DescriptionTab from './DescriptionTab';

export default function FormPBH({
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
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          kho: defaultValues.ma_kho
            ? {
                ma_kho: defaultValues?.ma_kho,
                ten_kho: defaultValues?.ten_kho,
              }
            : null,
          nhan_vien: defaultValues.ma_nv
            ? {
                ma_nv: defaultValues?.ma_nv,
                ten_nv: defaultValues?.ten_nv,
              }
            : null,
          khach_hang: defaultValues.ma_kh
            ? {
                ma_kh: defaultValues?.ma_kh,
                ten_kh: defaultValues?.ten_kh,
              }
            : null,
          kenh_ban: defaultValues.ma_kenh
            ? {
                ma_kenh: defaultValues?.ma_kenh,
                ten_kenh: defaultValues?.ten_kenh,
              }
            : null,
          pttt: defaultValues.ma_pttt
            ? {
                ma_pttt: defaultValues?.ma_pttt,
                ten_pttt: defaultValues?.ten_pttt,
              }
            : null,
          trang_thai: defaultValues.ma_trang_thai
            ? {
                ma_trang_thai: defaultValues.ma_trang_thai,
                ten_trang_thai: defaultValues.ten_trang_thai,
              }
            : null,
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
    const { kho, nhan_vien, khach_hang, kenh_ban, pttt, trang_thai, ...data } =
      values;
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
      ma_trang_thai: trang_thai?.ma_trang_thai,
      ten_trang_thai: trang_thai?.ten_trang_thai,
      details,
    };
    return result;
  };

  const tienHang = watch('tien_hang');
  const tienCkSp = watch('tien_ck_sp');
  const tyLeCkHoaDon = watch('ty_le_ck_hd');
  const tienCkHoaDon = watch('tien_ck_hd');
  const tongTienCk = watch('tong_tien_ck');
  const thanhTien = watch('thanh_tien');
  const VAT = watch('VAT');
  const tienVanChuyen = watch('tien_van_chuyen');

  const handleSave = async (values) => {
    const method = isEdit ? 'put' : 'post';
    const dataPost = generateDataPost(values);
    console.log({ dataPost });
    // await asyncPostData('dmpbh', dataPost, method).then((resp) => {
    //   if (!resp.message) {
    //     handleClose();
    //     reset();
    //     setLoad((prev) => prev + 1);
    //   }
    // });
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      tabRef.current?.handleChange(null, '1');
    }
  }, [errors]);
  // thay doi tong tien ck
  useEffect(() => {
    const tongTienCk = (tienCkHoaDon || 0) + (tienCkSp || 0);
    setValue('tong_tien_ck', tongTienCk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienCkSp, tienCkHoaDon]);
  // thay doi tien ck hd
  useEffect(() => {
    if (tyLeCkHoaDon) {
      const tienCkHdNew = ((tienHang || 0) * tyLeCkHoaDon) / 100;
      setValue('tien_ck_hd', tienCkHdNew);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienHang, tyLeCkHoaDon]);
  // thay doi ty le ck hd
  useEffect(() => {
    if (tienCkHoaDon) {
      const tyleCkHdNew = ((tienCkHoaDon || 0) * 100) / (tienHang || 0);
      setValue('ty_le_ck_hd', tyleCkHdNew);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienHang, tienCkHoaDon]);
  // thay doi thanh tien
  useEffect(() => {
    if (tienHang) {
      const thanhTienNew = tienHang - (tongTienCk || 0);
      setValue('thanh_tien', thanhTienNew);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienHang, tongTienCk]);
  // tong thanh tien
  useEffect(() => {
    const tienVAT = ((tienHang || 0) * VAT) / 100;
    const tongThanhTienNew =
      (thanhTien || 0) + (tienVAT || 0) + (tienVanChuyen || 0);
    setValue('t_thanh_tien', tongThanhTienNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienHang, thanhTien, VAT, tienVanChuyen]);
  // tien hang, tien ck san pham
  useEffect(() => {
    let tienHangNew = 0;
    let tienCkSpNew = 0;
    (details || []).forEach((item) => {
      tienHangNew += item.tien_hang;
      tienCkSpNew += item.tien_ck;
    });
    setValue('tien_hang', tienHangNew);
    setValue('tien_ck_sp', tienCkSpNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      width="900px"
      title={`${isEdit ? 'Chỉnh sửa' : 'Tạo'} phiếu bán hàng`}
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
          { label: 'Diễn giải', value: '3' },
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
            tienCkHoaDon={tienCkHoaDon}
          />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: '10px 0 0 0' }}>
          <DescriptionTab register={register} />
        </TabPanel>
      </TabsBase>
    </ModalBase>
  );
}
