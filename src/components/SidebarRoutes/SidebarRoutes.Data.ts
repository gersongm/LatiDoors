import{
    BarChart4,
    Building2,
    Calendar,
    CreditCard,
    LogOut,
    Settings,
    PanelsTopLeft,
    ShieldCheck,
    CircleHelpIcon,
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
        link: '/settings'
    },
    {
        title: 'Analisis',
        icon: BarChart4 ,
        link: '/analisis'
    },
 
    {
        title: 'Bancos',
        icon: Landmark,
        link: '/bancos'
    },
    {
        title:'Usuarios',
        icon: User,
        link: '/usuarios'
      },
      {
        title:'Roles',
        icon: Minimize2,
        link: '/roles'
      },
      {
        title:'Permisos',
        icon: Shield,
        link: '/permisos'
      },
      {
        title:'Reportes',
        icon: BookDashedIcon,
        link: '/reportes'
      },
 
    
]

export const dataUserSidebar=[
  {
    title:'Cajas',
    icon: CircleDollarSign,
    link: '/cajas'
  },
  {
    title:'Inventario',
    icon: GalleryHorizontal,
    link: '/inventario'
  },
  {
    title:'Ventas',
    icon: ShoppingCart,
    link: '/ventas'
  },
  {
    title:'Compras',
    icon: Truck,
    link: '/compras'
  },
  {
    title:'Clientes',
    icon: UserRound,
    link: '/clientes'
  },
  {
    title:'Proveedores',
    icon: Handshake,
    link: '/proveedores'
  },
  {
    title:'Productos',
    icon: ShoppingBasket,
    link: '/productos'
  },
  {
    title:'Categorias',
    icon: Layers3,
    link: '/categorias'
  },

    
   
 
]

export const dataGenericoSidebar=[
        
        {
            title: 'Calendar',
            icon: Calendar ,
            link: '/calendar'
        },
        {
            title: 'Ayuda',
            icon: CircleHelpIcon,
            link: '/help'
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