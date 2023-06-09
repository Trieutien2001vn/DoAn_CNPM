import { Avatar, Box, Button, Grid, Paper, Skeleton, Typography} from '@mui/material'
import { deepOrange } from '@mui/material/colors';
import React, { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiFillLeftCircle, AiFillRightCircle, AiOutlineFieldTime, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiDotsVerticalRounded, BiMap, BiPencil } from 'react-icons/bi';
import { BsTranslate, BsTrash, BsUpcScan } from 'react-icons/bs';
import { SlReload } from 'react-icons/sl';
import { TbArrowBigLeftFilled } from 'react-icons/tb';
import { TiDelete, TiFlash, TiMediaRecord } from 'react-icons/ti';
import ButtonBase from '~/components/button/ButtonBase';
import ImageTab from '~/components/form/product/ImageTab';
import SelectApiInput from '~/components/input/SelectApiInput';
import { dsDanhMuc } from '~/utils/data';

export default function Bill({
    defaultValues,
}) {
    const {
               control,

   
        formState: { isSubmitting, errors },
      } = useForm({
        mode: 'onBlur',
        defaultValues: defaultValues
        ? {
            ...defaultValues,
          
            vatTu: {
              ma_vt: defaultValues.ma_vt,
              ten_vt: defaultValues.ten_vt,
              theo_doi_lo: !!defaultValues.ma_lo || false
            },
          }
          :{
            
          }
      });
  return (
    <>
    <Box sx={{width:'100%',height:'100vh',padding:'10px 20px'}}>
    <Paper elevation={3} sx={{display:'flex', p:'0 5px',alignItems:'center',height:"10vh"}} >
    <Grid item sx={{width:'300px',m:"5px"}}>
          <Controller
            control={control}
            name="vatTu"
            render={({ field: { onChange, value } }) => (
              <SelectApiInput
                apiCode="dmvt"
                placeholder="Tìm tên, mã sản phẩm..."
                searchFileds={['ma_vt', 'ten_vt']}
                getOptionLabel={(option) => option.ten_vt}
                selectedValue={value}
                value={value || { ma_vt: '', ten_vt: '' }}
                onSelect={onChange}
                FormAdd={dsDanhMuc['dmvt'].Form}
                errorMessage={errors?.vatTu?.message}
              />
            )}
          />
        </Grid>
        <ButtonBase sx={{backgroundColor:"primary.main",ml:'20px'}}><BsUpcScan size='20px' color='white'/></ButtonBase>
        <Button sx={{background:"primary.main"}}><AiOutlinePlusCircle size='20px'/></Button>
        
      <Box sx={{display:'flex',alignItems:'center',width:'67%',justifyContent:'space-between'}}>
      <Box sx={{display:'flex',alignItems:'center'}}>
      <Button sx={{background:"primary.main"}}><AiFillLeftCircle size='20px'/></Button>
        <Paper elevation={3} sx={{height:'40px',display: 'flex', alignItems:'center', justifyContent: 'center', gap: '2px'}}>
          <Typography sx={{textAlign:'center',fontSize:'13px',p:'5px'}} >Hoa Don 3</Typography>
           <TiDelete size='20px'/>
           </Paper>
           <Button sx={{background:"primary.main"}}><AiFillRightCircle size='20px'/></Button>
        </Box>
      
        <Box sx={{display:'flex',alignItems:'center'}}>
        <Button sx={{background:"primary.main",mr:'4px'}}><TbArrowBigLeftFilled size='20px'/></Button>
        <Button sx={{background:"primary.main",mr:'4px'}}><SlReload size='20px'/></Button>
        <Box sx={{display:'flex',alignItems:'center', backgroundColor:"#cbcdd4", height:'40px',borderRadius:"5px",padding:'0 20px'}}>
          <BiMap/>
          <Typography sx={{textAlign:'center',fontSize:'13px',p:'10px'}} >Kho công ty</Typography>

        </Box>
        </Box>
      </Box>
      
    </Paper>
    <Box elevation={3} sx={{display:'flex', width:"100%", height:"75vh",mt:'10px'}} >
    <Paper elevation={3} sx={{display:'flex', width:"50%",height:'100%'}} >
    <Box sx={{display:'flex',flexDirection:'column',ml:'5px'}}>
    <Grid item sx={{width:'200px',m:"5px", position:'relative'}}>
          <Controller
            control={control}
            name="vatTu"
            render={({ field: { onChange, value } }) => (
              <SelectApiInput
                apiCode="dmvt"
                placeholder="Khách lẻ"
                searchFileds={['ma_vt', 'ten_vt']}
                getOptionLabel={(option) => option.ten_vt}
                selectedValue={value}
                value={value || { ma_vt: '', ten_vt: '' }}
                onSelect={onChange}
                FormAdd={dsDanhMuc['dmvt'].Form}
                errorMessage={errors?.vatTu?.message}
              />
            )}
          />
        </Grid>
        <AiOutlinePlus style={{position:'absolute',top:'100px',left:"200px"}}/>
        <Box sx={{display:'flex',m:'5px'}}>
          <Paper  sx={{p:'4px 10px',backgroundColor:'#ededed',mr:'10px'}}>
              <Typography sx={{fontSize:'13px'}}>Tất cả</Typography>
          </Paper>  
        </Box>
    <Box sx={{mt:'10px',width:'100%',height:'40%',display:'flex',gap:'10px',flexWrap:'wrap',overflow:'scroll'}}>
     <Box sx={{width:'150px',height:'190px',display:'flex',flexDirection:'column',ml:'5px'}}>
    <Avatar sx={{width:'100%',height:'80%',borderRadius:'5px'}}/>
      <Typography sx={{textAlign:'center'}}>10 000</Typography>
      <Typography sx={{fontSize:'13px'}}>Trà Chanh Ô Long</Typography>
     </Box>
    

   
    
     
    </Box>
   
    </Box>
      </Paper>
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:"50%",height:'100%'}}>
    <Paper elevation={3} sx={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',width:"100%",height:'15%',ml:'5px',p:'10px'}} >
       <Box sx={{display:'flex',gap:'10px',width:'40%'}}>
        <Typography sx={{fontSize:'13px'}}>1.</Typography>
        <BsTrash/>
        <Typography sx={{fontSize:'13px'}}>CP001</Typography>
        <Typography sx={{fontSize:'13px'}}>CHARMY TRUST 100ml</Typography>
       
       </Box>
       <Box sx={{display:'flex',alignItems:'center',mr:'2px'}}>
        <Typography sx={{fontSize:'12px', backgroundColor:'#cbcdd4',p:'3px',color:'black',borderRadius:'50px'}}>Chai</Typography>
       <BiDotsVerticalRounded/>
       </Box>
      </Paper>
      <Box sx={{display:'flex',justifyContent:'space-between',width:"100%",height:'40%'}}>
      <Paper elevation={3} sx={{display:'flex',flexDirection:'column',gap:'10px',width:"100%",height:'90%',ml:'5px'}} >
      <Box sx={{display:'flex',justifyContent:'space-between',width:"98%",height:'10%',mt:"5px",p:'10px'}}>
        <Box sx={{display:'flex',width:"40%",justifyContent:'space-between',alignItems:'center'}}>
          <Typography sx={{fontSize:'13px'}}>Tiền hàng</Typography>
          <Typography sx={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px', backgroundColor:'#cbcdd4',width:"20px",height:'20px',color:'black',borderRadius:'100%'}}>2</Typography>
        </Box>
        <Typography sx={{fontWeight:'700', fontSize:'13px'}} >2 000 000</Typography> 
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-between',width:"98%",height:'10%',mt:"5px",p:'10px'}}>
        <Box sx={{display:'flex',width:"40%",justifyContent:'space-between',alignItems:'center'}}>
          <Typography sx={{fontSize:'13px'}}>Chiết khấu sản phẩm</Typography>
          <Typography sx={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px', backgroundColor:'#cbcdd4',width:"20px",height:'20px',color:'black',borderRadius:'100%'}}>0</Typography>
        </Box>
        <Typography sx={{fontWeight:'700',fontSize:'13px'}} >0</Typography> 
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-between',width:"98%",height:'10%',mt:"5px",p:'10px'}}>
        <Box sx={{display:'flex',width:"40%",justifyContent:'space-between',alignItems:'center'}}>
          <Typography sx={{fontSize:'13px'}}>Thanh toán</Typography>
          <Typography sx={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px', backgroundColor:'#cbcdd4',width:"20px",height:'20px',color:'black',borderRadius:'100%'}}>2</Typography>
        </Box>
        <Typography sx={{fontWeight:'700',fontSize:'13px'}} >2 000 000</Typography> 
      </Box>
      <Typography sx={{borderBottom:'1px dashed #ededed',m:'0 10px'}}></Typography>
      <Box sx={{display:'flex',alignItems:'center',gap:'10px',p:'10px'}}>
        <BiPencil/>
        <Typography sx={{fontSize:'13px'}}>Ghi chú đơn hàng</Typography>
      </Box>
      </Paper>
      
    </Box>
      
    </Box>
    
      
    </Box>
    <Paper elevation={3} sx={{display:'flex', pl:'5px',alignItems:'center', height:"10vh",mt:'10px'}} >
      <Box sx={{display:'flex', width:"100%", justifyContent:'space-between',mr:"5px"}}>
      <Box sx={{display:'flex', gap:'10px'}}>
   <Button sx={{display:'flex',border:'2px solid transparent'}}>
    <TiFlash size='20px' color='black'/>
    <Typography sx={{textAlign:'center',textTransform:"none",fontSize:'13px',p:'2px'}} >Bán nhanh</Typography>

    </Button>
    <ButtonBase sx={{display:'flex',border:'2px solid transparent',backgroundColor:'primary.main'}}>
    <AiOutlineFieldTime size='20px' color='white'/>
    <Typography sx={{textAlign:'center',textTransform:"none",fontSize:'13px',p:'2px'}} color='white' >Bán thuòng</Typography>

    </ButtonBase>
   </Box>
   <Box sx={{display:'flex', gap:'10px'}}>
   <ButtonBase sx={{display:'flex',border:'2px solid transparent',backgroundColor:'primary.main',padding:'0 40px'}}>
    <Typography sx={{textAlign:'center',fontSize:'13px',p:'5px',letterSpacing:'2px'}} color='white' >Thanh toán</Typography>

    </ButtonBase>
    <Button sx={{display:'flex',border:'2px solid transparent',padding:'0 40px'}}>
    <Typography sx={{textAlign:'center',fontSize:'13px',p:'2px',letterSpacing:'2px'}} color="primary.main" >0522391726</Typography>

    </Button>
   </Box>
      </Box>
   
      </Paper>
    </Box>
    </>
  )


}
