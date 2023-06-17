import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { v4 } from 'uuid';
import ButtonBase from '~/components/button/ButtonBase';
import TextInput from '~/components/input/TextInput';
import ModalBase from '~/components/modal/ModalBase';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useApisContext from '~/hooks/hookContext/useApisContext';

const schemaBase = {
  ma_pttt: yup.string().required('Vui lòng nhập mã phuong thúc thanh toán'),
  ten_pttt:yup.string().required('Vui lòng nhập tên phuong thúc thanh toán'),

};

function FormPTTT({
  open,
  handleClose,
  setLoad = () => {},
  defaultValues,
  isEdit = false,
}) {
  const [schema, setSchema] = useState(() => yup.object(schemaBase));
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { asyncPostData } = useApisContext();


  // handle submit
  const handleSave = async (values) => {
    const method = isEdit ? 'put' : 'post';
    await asyncPostData('dmpttt',values, method).then((resp) => {
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
      title={`${isEdit ? 'Chỉnh sửa' : 'Thêm'} Phuong thúc thanh toán`}
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
            label="Mã Phuong Thuc Thanh Toán"
            placeholder="VD: PTTT0001"
            name="ma_pttt"
            register={register}
            required
            errorMessage={errors?.ma_pttt?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Tên Phuong Thuc Thanh Toán"
            placeholder="VD: Tiền mạc"
            name="ten_pttt"
            register={register}
            required
            errorMessage={errors?.ten_pttt?.message}
          />
        </Grid>
       
        
      </Grid>
    </ModalBase>
  );
}

export default FormPTTT;