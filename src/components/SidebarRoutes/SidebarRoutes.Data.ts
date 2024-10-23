import{
    BarChart4,
    Building2,
    Calendar,
    HandCoins,
    LogOut,
    Settings,
    PanelsTopLeft,
    ShieldCheck,
    User,
    Minimize2,
    Shield,
    BookDashedIcon,
    CircleDollarSign,
    GalleryHorizontal,
    Truck,
    ShoppingCart,
    UserRound,
    Handshake,
    ShoppingBasket,
    Layers3,
    Landmark,
    Fuel,
    Banknote,
    Section,
   
} from 'lucide-react'

export const dataAdminSidebar=[
    {
        title: 'Inicio',
        icon: PanelsTopLeft,
        link: '/',
    },
    {
        title: 'Configuracion',
        icon: Settings ,
        link: '/Admin/settings'
    },
    {
      title: 'Monedas',
      icon: HandCoins  ,
      link: '/Admin/money'
  },
    {
        title: 'Análisis',
        icon: BarChart4 ,
        link: '/Admin/analisis'
    },
    {
      title: 'Comprovantes',
      icon: Section,
      link: '/Admin/comprovantes_fiscales'
  },
    {
        title: 'Bancos',
        icon: Landmark,
        link: '/Admin/bancos'
    },
    {
        title:'Usuarios',
        icon: User,
        link: '/Admin/usuarios'
      },
      {
        title:'Roles',
        icon: Minimize2,
        link: '/Admin/roles'
      },
      {
        title:'Permisos',
        icon: Shield,
        link: '/Admin/permisos'
      },
      {
        title:'Reportes',
        icon: BookDashedIcon,
        link: '/Admin/reportes'
      },
 
    
]
export const dataInventarioSidebar=[
  {
    title:'Productos',
    icon: ShoppingBasket,
    link: '/mercancias'
  },
  {
    title:'Categorías',
    icon: Layers3,
    link: '/categorias'
  },
  {
    title:'Inventario',
    icon: GalleryHorizontal,
    link: '/inventario'
  },
  
]
export const dataIngresosSidebar=[
 
  {
    title:'Clientes',
    icon: UserRound,
    link: '/clientes'
  },
 

  {
    title:'Ventas',
    icon: ShoppingCart,
    link: '/ventas'
  },
  {
    title:'Cajas',
    icon: CircleDollarSign,
    link: '/cajas'
  },
  {
    title:'Notas de Credito',
    icon: ShoppingCart,
    link: '/notas-credito'
  },
]
export const dataGastosSidebar=[

  {
    title:'Proveedores',
    icon: Handshake,
    link: '/proveedores'
  },
  {
    title:'Compras',
    icon: Truck,
    link: '/compras'
  },
  {
    title:'Notas de Debito',
    icon: Banknote,
    link: '/notas-debito'
  },
  {
    title:'Otros Gastos',
    icon: Fuel,
    link: '/otros-gastos'
  },
]
export const dataGenericoSidebar=[
        
        {
            title: 'Instalaciones',
            icon: Calendar ,
            link: '/instalaciones'
        },
        {
            title:'Acerca de',
            icon: ShieldCheck,
            link: '/acerca-de'
          },
    
        {
            title: 'Terminos y Condiciones',
            icon: Building2,
            link: '/terms'
        },
        {
            title: 'Cerrar Session',
            icon: LogOut ,
            link: '/logout'
        },
]