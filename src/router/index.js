import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {onAuthStateChanged} from 'firebase/auth'
import {useFirebaseAuth} from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/propiedades/:id',
      name: 'propiedad',
      component: ()=>import('../views/admin/PropiedadView.vue')
    },
    {
      path:'/login',
      name:'login',
      component:()=> import('../views/LoginView.vue') 
    },
    {
      path:'/admin',
      name:'admin',
      component:()=>import('../views/admin/AdminLayout.vue'),
      meta:{requiresAuth:true},
      children:[
        {
          path:'propiedades',
          name:'admin-propiedades',
          component: ()=>import('../views/admin/AdminView.vue')
        },
        {
          path:'nueva',
          name:'nueva-propiedad',
          component: ()=>import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path:'editar/:id',
          name:'editar-propiedad',
          component: ()=>import('../views/admin/EditarPropiedadView.vue')
        },
      ]
    }
    
  ]
})

//guard de navegación
router.beforeEach(async (to, from,next)=>{
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    //comprobar autentación
    try {
      await authenticateUser()
      next() 
    } catch (error) {
      console.log(error)
      next({name:'login'})
    }
  }else{
    //no requiere autenticación
    next()
  }
})

function authenticateUser(){
  const auth = useFirebaseAuth()
  return new Promise((resolve, reject)=>{
    const unsubcribe = onAuthStateChanged(auth,(user)=>{
      unsubcribe()
      if(user){
        resolve()
      }else{
        reject()
      }
    })
  })
}
export default router
