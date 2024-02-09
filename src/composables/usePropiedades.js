import {computed, ref} from 'vue'
import { collection, doc, deleteDoc } from "firebase/firestore";
import {ref as storageRef, deleteObject} from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";

export default function usePropiedades() {
  const alberca = ref(false)

  const storage = useFirebaseStorage()
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, "propiedades"));

  const filterItems  = computed(()=>{
    return alberca.value ? 
      propiedadesCollection.value.filter(propiedad => propiedad.alberca) :
      propiedadesCollection.value
  })

  async function deleteItem(id, urlImage){
    if(confirm('¿Desasa eleiminar esta propiedad?')){
      const docRef = doc(db,'propiedades', id)
      
      //eliminar la imgen del storage
      const imageRef = storageRef(storage, urlImage)

      await Promise.all(
        [deleteDoc(docRef), deleteObject(imageRef)]
      )
     
      alert('Se ha eliminado correctamente')
    }
    

  }



  return {
    deleteItem,
    propiedadesCollection,
    filterItems,
    alberca
    
  };
}
