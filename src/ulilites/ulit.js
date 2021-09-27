export const onTargetChange = (index, THREE, currentItem, items,plane, uniforms) => {
// need to pass vector 
    //texture
    //current item
    // and item


    //item changed
    currentItem = items[index]
    if (!currentItem.texture) return

    //compute image ratio 

    let imageRatio =
        currentItem.img.naturalWidth / currentItem.img.naturalHeight
   let scale = new THREE.Vector3(imageRatio, 1, 1)
    uniforms.uTexture.value = currentItem.texture
    plane.scale.copy(scale)
}