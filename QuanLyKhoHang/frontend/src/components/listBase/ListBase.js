import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import AdminLayout from '~/components/layouts/AdminLayout';
import FilterSearch from '~/components/filter/FilterSearch';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { SiMicrosoftexcel } from 'react-icons/si';
import ButtonBase from '~/components/button/ButtonBase';
import { TbTableExport } from 'react-icons/tb';
import TableBase from '~/components/table/TableBase';
import useApisContext from '~/hooks/hookContext/useApisContext';

function ListBase({ title, maDanhMuc, columns, Form, isDeleted = false }) {
  const { asyncGetList, asyncGetListDeleted } = useApisContext();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [defaultValues, setDefaultValues] = useState();
  const [paginationOption, setPaginationOption] = useState({
    limit: 20,
    page: 1,
    totalRows: 0,
  });

  // row per page change
  const handleRowPerPageChange = (value) => {
    setPaginationOption({ ...paginationOption, limit: value });
  };
  // handle row clicked
  const handleRowClicked = (data) => {
    setDefaultValues(data);
    setOpenForm(true);
  };
  // get products
  const getListData = async () => {
    setLoading(true);
    const funcGetList = isDeleted ? asyncGetListDeleted : asyncGetList;
    const resp = await funcGetList(maDanhMuc, {
      limit: paginationOption.limit,
      page: paginationOption.page,
    });
    if (resp) {
      setData(resp.data);
      setPaginationOption({ ...paginationOption, totalRows: resp.count });
    }
    setLoading(false);
  };

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maDanhMuc, paginationOption.limit, paginationOption.page, load]);

  return (
    <>
      {openForm && (
        <Form
          open={openForm}
          handleClose={() => {
            setOpenForm(false);
            setDefaultValues(null);
          }}
          setLoad={setLoad}
          defaultValues={defaultValues}
        />
      )}
      <AdminLayout>
        <Box sx={{ padding: '10px 0' }}>
          <Grid container spacing="10px" alignItems="flex-start">
            <Grid item xs={3} lg={2}>
              <Stack spacing="10px">
                <FilterSearch title="Mã sản phẩm" />
              </Stack>
            </Grid>
            <Grid item xs={9} lg={10}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                  {`${isDeleted ? 'Khôi phục' : 'Danh sách'} ${title}`}
                </Typography>
                <Stack direction="row" spacing="10px">
                  {!isDeleted && (
                    <>
                      <ButtonBase
                        startIcon={<AiOutlinePlusCircle fontSize="14px" />}
                        onClick={() => setOpenForm(true)}
                      >
                        Thêm mới
                      </ButtonBase>
                      <ButtonBase
                        startIcon={<SiMicrosoftexcel fontSize="14px" />}
                      >
                        Import excel
                      </ButtonBase>
                    </>
                  )}
                  <ButtonBase startIcon={<TbTableExport fontSize="14px" />}>
                    Export excel
                  </ButtonBase>
                </Stack>
              </Stack>
              <Box>
                <TableBase
                  maDanhMuc={maDanhMuc}
                  columns={columns || []}
                  data={data}
                  title={title}
                  progressPending={loading}
                  paginationTotalRows={paginationOption.totalRows}
                  paginationPerPage={paginationOption.limit}
                  onChangeRowsPerPage={handleRowPerPageChange}
                  onRowClicked={handleRowClicked}
                  loadData={getListData}
                  isDeleted={isDeleted}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </AdminLayout>
    </>
  );
}

export default ListBase;
