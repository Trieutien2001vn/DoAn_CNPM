import { Grid, Stack } from '@mui/material';
import React, { memo } from 'react';
import ButtonBase from '~/components/button/ButtonBase';
import TableDisplay from '~/components/table/TableDisplay';
import { numeralCustom } from '~/utils/helpers';
import { BsPlusCircle } from 'react-icons/bs';
import ModalBase from '~/components/modal/ModalBase';
import { FiSave } from 'react-icons/fi';
import { v4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import TextInput from '~/components/input/TextInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import { cloneDeep } from 'lodash';

const columns = [
  {
    name: 'Tên',
    selector: (row) => row.ten_dvt,
    left: true,
    sortable: true,
  },
  {
    name: 'Số lượng quy đổi',
    selector: (row) => row.sl_quy_doi,
    center: true,
  },
  {
    name: 'Giá bán quy đổi',
    selector: (row) => row.gia_ban_qd,
    format: (row) => numeralCustom(row.gia_ban_qd).format(),
    right: true,
  },
];

function DvtVariant({ dvts, setDvts }) {
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);
  const alertSnackbar = useSnackbarContext();

  const addDvt = (dvt, isEdit) => {
    const existed = dvts.find((item) => item.ten_dvt === dvt.ten_dvt);
    if (existed) {
      alertSnackbar('error', `Đơn vị tính '${existed.ten_dvt}' đã tồn tại`);
      return;
    }
    if (isEdit) {
      const uniqueKey = isEdit.id ? 'id' : '_id';
      const index = dvts.findIndex(
        (item) => item[uniqueKey] === dvt[uniqueKey]
      );
      if (index >= 0) {
        const dvtsCoypy = cloneDeep(dvts);
        dvtsCoypy.splice(index, 1, dvt);
        setDvts(dvtsCoypy);
      }
    } else {
      setDvts((prev) => [{ ...dvt, id: v4() }, ...prev]);
    }
  };
  // handle row clicked
  const handleRowClicked = (data) => {
    setDefaultValue(data);
    setIsEdit(true);
    setOpenForm(true);
  };
  // handle delete
  const handleDelete = (data) => {
    let dvtsCoypy = cloneDeep(dvts);
    dvtsCoypy = dvtsCoypy.filter(
      (item) => (item.id || item._id) !== (data.id || data._id)
    );
    setDvts(dvtsCoypy);
  };

  return (
    <>
      {openForm && (
        <FormDvt
          open={openForm}
          handleClose={() => {
            setOpenForm(false);
            setIsEdit(false);
            setDefaultValue(null);
          }}
          isEdit={isEdit}
          addDvt={addDvt}
          defaultValue={defaultValue}
        />
      )}
      <Stack spacing="5px" alignItems="flex-end">
        <ButtonBase
          variant="outlined"
          startIcon={<BsPlusCircle style={{ fontSize: '14px' }} />}
          onClick={() => setOpenForm(true)}
        >
          Thêm đơn vị tính
        </ButtonBase>
        <TableDisplay
          title="đơn vị tính khác"
          columns={columns}
          data={dvts || []}
          onRowClicked={handleRowClicked}
          handleDelete={handleDelete}
          uniqueKey={'ten_dvt'}
        />
      </Stack>
    </>
  );
}

export default memo(DvtVariant);

const schema = yup.object({
  ten_dvt: yup.string().required('Vui lòng nhập tên đơn vị tính'),
  sl_quy_doi: yup
    .number()
    .typeError('Số lượng phải là số')
    .required('Vui lòng nhập số lượng quy đổi'),
  gia_ban_qd: yup
    .number()
    .typeError('Giá bán phải là số')
    .required('Vui lòng nhập giá bán quy đổi'),
});

function FormDvt({ open, handleClose, isEdit, addDvt, defaultValue = {} }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });

  // handle save
  const handleSave = (values) => {
    addDvt(values, isEdit);
    handleClose();
  };

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      width="300px"
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
        <Grid item xs={12}>
          <TextInput
            register={register}
            name="ten_dvt"
            label="Tên đơn vị tính"
            required
            errorMessage={errors?.ten_dvt?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            type="number"
            register={register}
            name="sl_quy_doi"
            label="Số lượng quy đổi"
            required
            errorMessage={errors?.sl_quy_doi?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="gia_ban_qd"
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={numeralCustom(value).format()}
                onChange={(e) =>
                  onChange(numeralCustom(e.target.value).value())
                }
                label="Giá bán"
                required
                errorMessage={errors?.gia_ban_qd?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </ModalBase>
  );
}
