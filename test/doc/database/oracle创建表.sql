-- Create table
create table TCATEGORYMANAGEMENT
(
  pk             VARCHAR2(40) not null,
  categoryname   VARCHAR2(100),
  categoryremark VARCHAR2(255),
  groupcode      VARCHAR2(50),
  inserttime     VARCHAR2(40),
  lastestupdate  VARCHAR2(40),
  updateperson   VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TCATEGORYMANAGEMENT
  is '类目管理表';
-- Add comments to the columns 
comment on column TCATEGORYMANAGEMENT.pk
  is '主键';
comment on column TCATEGORYMANAGEMENT.categoryname
  is '类目名称';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TCATEGORYMANAGEMENT
  add constraint TCATEGORYMANAGEMENT_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  
  -- Create table
create table TITEMMANAGE
(
  pk              VARCHAR2(50) not null,
  imcategorypk    VARCHAR2(50),
  imtype          VARCHAR2(50),
  imname          VARCHAR2(100),
  imassettype     VARCHAR2(50),
  imspecification VARCHAR2(100),
  immetricunit    VARCHAR2(50),
  imremark        VARCHAR2(255),
  inserttime      VARCHAR2(40),
  lastestupdate   VARCHAR2(40),
  updateperson    VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TITEMMANAGE
  is '物品管理表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TITEMMANAGE
  add constraint TITEMMANAGE_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TITEMSAPPLYMANAGEMENT
(
  pk                   VARCHAR2(50) not null,
  itemsapplycode       VARCHAR2(50),
  categoryname         VARCHAR2(100),
  categorymanagementpk VARCHAR2(50),
  orgcode              VARCHAR2(50),
  itemsapplydeptcode   VARCHAR2(50),
  applyperson          VARCHAR2(50),
  itemsapplydate       VARCHAR2(40),
  iamcheckflag         VARCHAR2(50),
  itemsapplyflag       VARCHAR2(50),
  approvalflag         VARCHAR2(100),
  itemsissuelister     VARCHAR2(20),
  itemsissuedate       VARCHAR2(40),
  itemsapplyremark     VARCHAR2(255),
  linkers              VARCHAR2(2000),
  allowapprperson      VARCHAR2(1000),
  inserttime           VARCHAR2(40),
  lastestupdate        VARCHAR2(40),
  updateperson         VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TITEMSAPPLYMANAGEMENT
  is '物品申领管理表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TITEMSAPPLYMANAGEMENT
  add constraint TITEMSAPPLYMANAGEMENT_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TITEMSAPPLYMDETAIL
(
  pk                   VARCHAR2(50) not null,
  itemsapplympk        VARCHAR2(50),
  categorymanagementpk VARCHAR2(50),
  itemmanagepk         VARCHAR2(50),
  orgcode              VARCHAR2(50),
  itemsapplydeptcode   VARCHAR2(50),
  imname               VARCHAR2(100),
  imassettype          VARCHAR2(50),
  imtype               VARCHAR2(50),
  imspecification      VARCHAR2(50),
  immetricunit         VARCHAR2(50),
  iamapplycount        NUMBER,
  iamcheckflag         VARCHAR2(50),
  iamlistercheckcount  NUMBER,
  iamleadercheckcount  NUMBER,
  assetregpk           VARCHAR2(2000),
  iamitemmanagepk      VARCHAR2(50),
  inserttime           VARCHAR2(40),
  lastestupdate        VARCHAR2(40),
  updateperson         VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TITEMSAPPLYMDETAIL
  is '物品申领管理明细表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TITEMSAPPLYMDETAIL
  add constraint TITEMSAPPLYMDETAIL_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TITEMSPURCHASE
(
  pk                 VARCHAR2(50) not null,
  ipcode             VARCHAR2(50),
  ipcategorypk       VARCHAR2(50),
  iporgcode          VARCHAR2(50),
  ipdeptcode         VARCHAR2(50),
  ipapplyperson      VARCHAR2(50),
  ippurchasedate     VARCHAR2(40),
  applyperson        VARCHAR2(50),
  ippurchasecountsum NUMBER,
  ipstorecountsum    NUMBER,
  ipremark           VARCHAR2(255),
  ipapprovalflag     VARCHAR2(100),
  linkers            VARCHAR2(2000),
  allowapprperson    VARCHAR2(1000),
  inserttime         VARCHAR2(40),
  lastestupdate      VARCHAR2(40),
  updateperson       VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TITEMSPURCHASE
  is '物品采购申请表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TITEMSPURCHASE
  add constraint TITEMSPURCHASE_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TITEMSPURCHASEDETAIL
(
  pk                 VARCHAR2(50) not null,
  ipditemspurchasepk VARCHAR2(50),
  ipditemmanagepk    VARCHAR2(50),
  ipdname            VARCHAR2(100),
  ipdtype            VARCHAR2(50),
  ipdspecification   VARCHAR2(50),
  ipdmetricunit      VARCHAR2(50),
  ipdapplycount      NUMBER,
  ipdapprovecount    NUMBER,
  ipdpurchasecount   NUMBER,
  ipdstorecount      NUMBER,
  ipdcheckflag       VARCHAR2(50),
  inserttime         VARCHAR2(40),
  lastestupdate      VARCHAR2(40),
  updateperson       VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TITEMSPURCHASEDETAIL
  is '物品采购申请明细表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TITEMSPURCHASEDETAIL
  add constraint TITEMSPURCHASEDETAIL_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TLOWVALUEITEMS
(
  pk               VARCHAR2(50) not null,
  lvicategorypk    VARCHAR2(50),
  lviitemmanagepk  VARCHAR2(50),
  lviname          VARCHAR2(100),
  lvitype          VARCHAR2(50),
  lvispecification VARCHAR2(100),
  lvimetricunit    VARCHAR2(50),
  lvicount         NUMBER,
  lviremark        VARCHAR2(255),
  inserttime       VARCHAR2(40),
  lastestupdate    VARCHAR2(40),
  updateperson     VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TLOWVALUEITEMS
  is '低值品仓库表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TLOWVALUEITEMS
  add constraint TLOWVALUEITEMS_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TLVISTORERECORD
(
  pk                 VARCHAR2(50) not null,
  lvisrpurchasepk    VARCHAR2(50),
  lvisrcategorypk    VARCHAR2(50),
  lvisritemmanagepk  VARCHAR2(50),
  lvisrorgcode       VARCHAR2(50),
  lvisrname          VARCHAR2(100),
  lvisrtype          VARCHAR2(50),
  lvisrspecification VARCHAR2(100),
  lvisrmetricunit    VARCHAR2(50),
  lvisrcount         NUMBER,
  lvisrperson        VARCHAR2(20),
  lvisrdate          VARCHAR2(50),
  lvisrremark        VARCHAR2(255),
  inserttime         VARCHAR2(40),
  lastestupdate      VARCHAR2(40),
  updateperson       VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TLVISTORERECORD
  is '低值品入库记录表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TLVISTORERECORD
  add constraint TLVISTORERECORD_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

  
  -- Create table
create table TLVIPOPRECORD
(
  pk                 VARCHAR2(50) not null,
  lviprcategorypk    VARCHAR2(50),
  lvipritemmanagepk  VARCHAR2(50),
  lviprname          VARCHAR2(100),
  lviprtype          VARCHAR2(50),
  lviprspecification VARCHAR2(100),
  lviprmetricunit    VARCHAR2(50),
  lviprcount         NUMBER,
  lviprapplyperson   VARCHAR2(20),
  lviprperson        VARCHAR2(20),
  lviprdate          VARCHAR2(50),
  lviprremark        VARCHAR2(255),
  inserttime         VARCHAR2(40),
  lastestupdate      VARCHAR2(40),
  updateperson       VARCHAR2(20)
)
tablespace SAM_GDCZ31
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table TLVIPOPRECORD
  is '低值品出库记录表';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TLVIPOPRECORD
  add constraint TLVIPOPRECORD_PK primary key (PK)
  using index 
  tablespace SAM_GDCZ31
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
