USE [master]
GO
/****** Object:  Database [QLPG]    Script Date: 11/16/2022 1:45:33 PM ******/
CREATE DATABASE [QLPG]
GO
USE [QLPG]
GO
/****** Object:  Table [dbo].[DICHVU]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DICHVU](
	[MADV] [char](10) NOT NULL,
	[TENDV] [nvarchar](50) NOT NULL,
	[SONGAYSUDUNG] [int] NOT NULL,
	[GIA] [money] NOT NULL,
	[HIENHANH] [bit] NOT NULL CONSTRAINT [DF_DICHVU_HIENHANH]  DEFAULT ((1)),
 CONSTRAINT [PK_DICHVU] PRIMARY KEY CLUSTERED 
(
	[MADV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[INBODY]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[INBODY](
	[STT] [int] IDENTITY(1,1) NOT NULL,
	[CHIEUCAO] [float] NOT NULL,
	[CANNANG] [float] NOT NULL,
	[TILE_NUOC] [float] NOT NULL,
	[TILE_MO] [float] NOT NULL,
	[KHOILUONG_CO] [float] NOT NULL,
	[MAKH] [char](10) NOT NULL,
	[NGAYGIO] [datetime] NOT NULL,
 CONSTRAINT [PK_INBODY] PRIMARY KEY CLUSTERED 
(
	[STT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KHACHHANG]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KHACHHANG](
	[MAKH] [char](10) NOT NULL,
	[HOTEN] [nvarchar](50) NOT NULL,
	[GIOITINH] [nvarchar](5) NOT NULL CONSTRAINT [DF_kHACHHANG_GIOITINH]  DEFAULT (N'Nam'),
	[NAMSINH] [char](5) NOT NULL,
	[SDT] [char](10) NOT NULL,
	[NGAYTHAMGIA] [date] NOT NULL,
	[HINHANH] [char](200) NOT NULL,
 CONSTRAINT [PK_kHACHHANG] PRIMARY KEY CLUSTERED 
(
	[MAKH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LICHSUVAOPHONG]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LICHSUVAOPHONG](
	[STT] [int] IDENTITY(1,1) NOT NULL,
	[NGAYGIO] [datetime] NOT NULL CONSTRAINT [DF_LICHSUVAOPHONG_NGAYGIO]  DEFAULT (getdate()),
	[MAPDK] [char](10) NOT NULL,
 CONSTRAINT [PK_LICHSUVAOPHONG] PRIMARY KEY CLUSTERED 
(
	[STT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NHANVIEN]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NHANVIEN](
	[MANV] [char](10) NOT NULL,
	[HOTEN] [nvarchar](50) NOT NULL,
	[SDT] [char](10) NOT NULL,
	[CHUCVU] [char](20) NOT NULL CONSTRAINT [DF_NHANVIEN_CHUCVU]  DEFAULT ('TIEPTAN'),
 CONSTRAINT [PK_NHANVIEN] PRIMARY KEY CLUSTERED 
(
	[MANV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PHIEUDANGKY]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PHIEUDANGKY](
	[MAPDK] [char](10) NOT NULL CONSTRAINT [DF_PHIEUDANGKY_MAPDK]  DEFAULT (getdate()),
	[NGAYDK] [date] NOT NULL CONSTRAINT [DF_PHIEUDANGKY_NGAYDK]  DEFAULT (getdate()),
	[NGAYBD] [date] NOT NULL,
	[NGAYKT] [date] NOT NULL,
	[TILEKM] [int] NOT NULL CONSTRAINT [DF_PHIEUDANGKY_TILEKM]  DEFAULT ((0)),
	[TONGTIEN] [money] NOT NULL,
	[TRANGTHAI] [nvarchar](20) NOT NULL CONSTRAINT [DF_PHIEUDANGKY_TRANGTHAI]  DEFAULT (N'Chờ kích hoạt'),
	[MAKH] [char](10) NOT NULL,
	[MANVLAP] [char](10) NOT NULL,
	[MADV] [char](10) NOT NULL,
	[MANVHUY] [char](10) NULL,
 CONSTRAINT [PK_PHIEUDANGKY] PRIMARY KEY CLUSTERED 
(
	[MAPDK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PHIEUTHUTIEN]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PHIEUTHUTIEN](
	[MAPTT] [char](10) NOT NULL,
	[SOTIENTHU] [money] NOT NULL,
	[NGAYTHU] [date] NOT NULL CONSTRAINT [DF_PHIEUTHUTIEN_NGAYTHU]  DEFAULT (getdate()),
	[MAPDK] [char](10) NOT NULL,
	[MANV] [char](10) NOT NULL,
 CONSTRAINT [PK_PHIEUTHUTIEN] PRIMARY KEY CLUSTERED 
(
	[MAPTT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TAIKHOAN]    Script Date: 11/16/2022 1:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TAIKHOAN](
	[TENDANGNHAP] [char](10) NOT NULL,
	[MATKHAU] [char](10) NOT NULL,
	[KHOA] [bit] NOT NULL,
 CONSTRAINT [PK_TAIKHOAN] PRIMARY KEY CLUSTERED 
(
	[TENDANGNHAP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[DICHVU] ([MADV], [TENDV], [SONGAYSUDUNG], [GIA], [HIENHANH]) VALUES (N'DV01      ', N'Gói tập 1 tháng', 30, 300000.0000, 1)
INSERT [dbo].[DICHVU] ([MADV], [TENDV], [SONGAYSUDUNG], [GIA], [HIENHANH]) VALUES (N'DV02      ', N'Gói tập 1 năm', 365, 3400000.0000, 1)
SET IDENTITY_INSERT [dbo].[INBODY] ON 

INSERT [dbo].[INBODY] ([STT], [CHIEUCAO], [CANNANG], [TILE_NUOC], [TILE_MO], [KHOILUONG_CO], [MAKH], [NGAYGIO]) VALUES (1, 176, 60, 70, 17, 17, N'KH01      ', CAST(N'2020-10-09 00:00:00.000' AS DateTime))
INSERT [dbo].[INBODY] ([STT], [CHIEUCAO], [CANNANG], [TILE_NUOC], [TILE_MO], [KHOILUONG_CO], [MAKH], [NGAYGIO]) VALUES (2, 176, 60, 70, 12, 20, N'KH01      ', CAST(N'2021-03-09 00:00:00.000' AS DateTime))
INSERT [dbo].[INBODY] ([STT], [CHIEUCAO], [CANNANG], [TILE_NUOC], [TILE_MO], [KHOILUONG_CO], [MAKH], [NGAYGIO]) VALUES (3, 176, 76, 70, 10, 22, N'KH01      ', CAST(N'2022-07-09 00:00:00.000' AS DateTime))
INSERT [dbo].[INBODY] ([STT], [CHIEUCAO], [CANNANG], [TILE_NUOC], [TILE_MO], [KHOILUONG_CO], [MAKH], [NGAYGIO]) VALUES (4, 176, 76, 70, 7, 25, N'KH01      ', CAST(N'2022-10-27 00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[INBODY] OFF
INSERT [dbo].[KHACHHANG] ([MAKH], [HOTEN], [GIOITINH], [NAMSINH], [SDT], [NGAYTHAMGIA], [HINHANH]) VALUES (N'KH01      ', N'Vũ Việt Trường', N'Nam', N'2014 ', N'0399999   ', CAST(N'2021-09-09' AS Date), N'test                                                                                                                                                                                                    ')
INSERT [dbo].[KHACHHANG] ([MAKH], [HOTEN], [GIOITINH], [NAMSINH], [SDT], [NGAYTHAMGIA], [HINHANH]) VALUES (N'KH02      ', N'Bùi Tuấn Hùng', N'Nam', N'2011 ', N'0399999   ', CAST(N'2021-09-09' AS Date), N'TEST                                                                                                                                                                                                    ')
SET IDENTITY_INSERT [dbo].[LICHSUVAOPHONG] ON 

INSERT [dbo].[LICHSUVAOPHONG] ([STT], [NGAYGIO], [MAPDK]) VALUES (1, CAST(N'2020-10-09 00:00:00.000' AS DateTime), N'PDK01     ')
INSERT [dbo].[LICHSUVAOPHONG] ([STT], [NGAYGIO], [MAPDK]) VALUES (2, CAST(N'2021-03-09 00:00:00.000' AS DateTime), N'PDK01     ')
INSERT [dbo].[LICHSUVAOPHONG] ([STT], [NGAYGIO], [MAPDK]) VALUES (3, CAST(N'2022-07-09 00:00:00.000' AS DateTime), N'PDK02     ')
INSERT [dbo].[LICHSUVAOPHONG] ([STT], [NGAYGIO], [MAPDK]) VALUES (4, CAST(N'2022-10-27 00:00:00.000' AS DateTime), N'PDK03     ')
SET IDENTITY_INSERT [dbo].[LICHSUVAOPHONG] OFF
INSERT [dbo].[NHANVIEN] ([MANV], [HOTEN], [SDT], [CHUCVU]) VALUES (N'NV01      ', N'Vũ Việt Trường', N'0399999   ', N'QUANLY              ')
INSERT [dbo].[NHANVIEN] ([MANV], [HOTEN], [SDT], [CHUCVU]) VALUES (N'NV02      ', N'Lê Ngọc Quỳnh', N'0399999   ', N'TIEPTAN             ')
INSERT [dbo].[PHIEUDANGKY] ([MAPDK], [NGAYDK], [NGAYBD], [NGAYKT], [TILEKM], [TONGTIEN], [TRANGTHAI], [MAKH], [MANVLAP], [MADV], [MANVHUY]) VALUES (N'PDK01     ', CAST(N'2020-09-09' AS Date), CAST(N'2020-09-09' AS Date), CAST(N'2021-09-09' AS Date), 0, 3400000.0000, N'Đã kích hoạt', N'KH01      ', N'NV01      ', N'DV02      ', NULL)
INSERT [dbo].[PHIEUDANGKY] ([MAPDK], [NGAYDK], [NGAYBD], [NGAYKT], [TILEKM], [TONGTIEN], [TRANGTHAI], [MAKH], [MANVLAP], [MADV], [MANVHUY]) VALUES (N'PDK02     ', CAST(N'2021-09-09' AS Date), CAST(N'2021-09-09' AS Date), CAST(N'2022-09-09' AS Date), 5, 3230000.0000, N'Đã kích hoạt', N'KH01      ', N'NV01      ', N'DV02      ', NULL)
INSERT [dbo].[PHIEUDANGKY] ([MAPDK], [NGAYDK], [NGAYBD], [NGAYKT], [TILEKM], [TONGTIEN], [TRANGTHAI], [MAKH], [MANVLAP], [MADV], [MANVHUY]) VALUES (N'PDK03     ', CAST(N'2022-10-09' AS Date), CAST(N'2022-10-09' AS Date), CAST(N'2022-11-09' AS Date), 0, 300000.0000, N'Đã kích hoạt', N'KH01      ', N'NV02      ', N'DV01      ', NULL)
INSERT [dbo].[PHIEUDANGKY] ([MAPDK], [NGAYDK], [NGAYBD], [NGAYKT], [TILEKM], [TONGTIEN], [TRANGTHAI], [MAKH], [MANVLAP], [MADV], [MANVHUY]) VALUES (N'PDK04     ', CAST(N'2022-11-05' AS Date), CAST(N'2022-11-11' AS Date), CAST(N'2022-12-11' AS Date), 0, 300000.0000, N'Chờ kích hoạt', N'KH02      ', N'NV02      ', N'DV01      ', NULL)
INSERT [dbo].[PHIEUTHUTIEN] ([MAPTT], [SOTIENTHU], [NGAYTHU], [MAPDK], [MANV]) VALUES (N'PTT01     ', 3400000.0000, CAST(N'2020-09-09' AS Date), N'PDK01     ', N'NV01      ')
INSERT [dbo].[PHIEUTHUTIEN] ([MAPTT], [SOTIENTHU], [NGAYTHU], [MAPDK], [MANV]) VALUES (N'PTT02     ', 3230000.0000, CAST(N'2021-09-09' AS Date), N'PDK02     ', N'NV02      ')
INSERT [dbo].[PHIEUTHUTIEN] ([MAPTT], [SOTIENTHU], [NGAYTHU], [MAPDK], [MANV]) VALUES (N'PTT03     ', 300000.0000, CAST(N'2021-10-09' AS Date), N'PDK03     ', N'NV02      ')
INSERT [dbo].[PHIEUTHUTIEN] ([MAPTT], [SOTIENTHU], [NGAYTHU], [MAPDK], [MANV]) VALUES (N'PTT04     ', 300000.0000, CAST(N'2022-11-05' AS Date), N'PDK04     ', N'NV02      ')
ALTER TABLE [dbo].[TAIKHOAN] ADD  CONSTRAINT [DF_TAIKHOAN_KHOA]  DEFAULT ((0)) FOR [KHOA]
GO
ALTER TABLE [dbo].[INBODY]  WITH CHECK ADD  CONSTRAINT [FK_INBODY_KHACHHANG] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KHACHHANG] ([MAKH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[INBODY] CHECK CONSTRAINT [FK_INBODY_KHACHHANG]
GO
ALTER TABLE [dbo].[LICHSUVAOPHONG]  WITH CHECK ADD  CONSTRAINT [FK_LICHSUVAOPHONG_PHIEUDANGKY] FOREIGN KEY([MAPDK])
REFERENCES [dbo].[PHIEUDANGKY] ([MAPDK])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[LICHSUVAOPHONG] CHECK CONSTRAINT [FK_LICHSUVAOPHONG_PHIEUDANGKY]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUDANGKY_DICHVU] FOREIGN KEY([MADV])
REFERENCES [dbo].[DICHVU] ([MADV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [FK_PHIEUDANGKY_DICHVU]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUDANGKY_KHACHHANG] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KHACHHANG] ([MAKH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [FK_PHIEUDANGKY_KHACHHANG]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUDANGKY_NHANVIEN] FOREIGN KEY([MANVLAP])
REFERENCES [dbo].[NHANVIEN] ([MANV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [FK_PHIEUDANGKY_NHANVIEN]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUDANGKY_NHANVIEN1] FOREIGN KEY([MANVHUY])
REFERENCES [dbo].[NHANVIEN] ([MANV])
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [FK_PHIEUDANGKY_NHANVIEN1]
GO
ALTER TABLE [dbo].[PHIEUTHUTIEN]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUTHUTIEN_NHANVIEN] FOREIGN KEY([MANV])
REFERENCES [dbo].[NHANVIEN] ([MANV])
GO
ALTER TABLE [dbo].[PHIEUTHUTIEN] CHECK CONSTRAINT [FK_PHIEUTHUTIEN_NHANVIEN]
GO
ALTER TABLE [dbo].[PHIEUTHUTIEN]  WITH CHECK ADD  CONSTRAINT [FK_PHIEUTHUTIEN_PHIEUDANGKY] FOREIGN KEY([MAPDK])
REFERENCES [dbo].[PHIEUDANGKY] ([MAPDK])
GO
ALTER TABLE [dbo].[PHIEUTHUTIEN] CHECK CONSTRAINT [FK_PHIEUTHUTIEN_PHIEUDANGKY]
GO
ALTER TABLE [dbo].[TAIKHOAN]  WITH CHECK ADD  CONSTRAINT [FK_TAIKHOAN_NHANVIEN] FOREIGN KEY([TENDANGNHAP])
REFERENCES [dbo].[NHANVIEN] ([MANV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[TAIKHOAN] CHECK CONSTRAINT [FK_TAIKHOAN_NHANVIEN]
GO
ALTER TABLE [dbo].[KHACHHANG]  WITH CHECK ADD  CONSTRAINT [CK_GIOITINH] CHECK  (([GIOITINH]=N'Nam' OR [GIOITINH]=N'Nữ'))
GO
ALTER TABLE [dbo].[KHACHHANG] CHECK CONSTRAINT [CK_GIOITINH]
GO
ALTER TABLE [dbo].[KHACHHANG]  WITH CHECK ADD  CONSTRAINT [CK_NAMSINH] CHECK  (((CONVERT([int],[NAMSINH])+(6))<CONVERT([int],datepart(year,getdate()))))
GO
ALTER TABLE [dbo].[KHACHHANG] CHECK CONSTRAINT [CK_NAMSINH]
GO
ALTER TABLE [dbo].[NHANVIEN]  WITH CHECK ADD  CONSTRAINT [CK_CHUCVU] CHECK  (([CHUCVU]='TIEPTAN' OR [CHUCVU]='QUANLY'))
GO
ALTER TABLE [dbo].[NHANVIEN] CHECK CONSTRAINT [CK_CHUCVU]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [CK_NGAYBD] CHECK  (([NGAYBD]>=[NGAYDK]))
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [CK_NGAYBD]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [CK_NGAYKT] CHECK  (([NGAYKT]>[NGAYBD]))
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [CK_NGAYKT]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [CK_TILEKM] CHECK  (([TILEKM]>=(0) AND [TILEKM]<=(100)))
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [CK_TILEKM]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [CK_TONGTIEN] CHECK  (([TONGTIEN]>=(0)))
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [CK_TONGTIEN]
GO
ALTER TABLE [dbo].[PHIEUDANGKY]  WITH CHECK ADD  CONSTRAINT [CK_TRANGTHAI] CHECK  (([TRANGTHAI]=N'Chờ kích hoạt' OR [TRANGTHAI]=N'Đã kích hoạt' OR [TRANGTHAI]=N'Đã hủy'))
GO
ALTER TABLE [dbo].[PHIEUDANGKY] CHECK CONSTRAINT [CK_TRANGTHAI]
GO
USE [master]
GO
ALTER DATABASE [QLPG] SET  READ_WRITE 
GO
