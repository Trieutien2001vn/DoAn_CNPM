import React from 'react';
import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ListBase from '~/components/listBase/ListBase';
import { dsDanhMuc } from '~/utils/data';

function List() {
  const { maDanhMuc } = useParams();
  const danhMuc = useMemo(() => {
    return dsDanhMuc[maDanhMuc];
  }, [maDanhMuc]);
  if (!danhMuc) {
    return <Navigate to="/404" />;
  }

  return (
    <ListBase
      title={danhMuc?.title}
      columns={danhMuc?.columns}
      maDanhMuc={maDanhMuc}
      Form={danhMuc.Form}
    />
  );
}

export default List;
