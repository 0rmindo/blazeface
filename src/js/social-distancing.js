async function calcSocialDistancing() {
  const faces = await findFaces();
  
  if (faces.length === 0) {
    statusMessage.innerText = 'Ops, nenhum rosto encontrado :(';
    return;
  }
  
  const context = canvas.getContext('2d');
  let isOk = true;
  
  // Sort by the distance to the body's left margin (ascending)
  faces.sort((face1, face2) => face1.topLeft.x - face2.topLeft.x);
  
  for (let index = 0; index < faces.length; index++) {
    if (index === 0) continue;
  
    const currentFace = faces[index];
    const lastFace = faces[index - 1];
    const distance = currentFace.topLeft.x - lastFace.bottomRight.x;
    const isSecure = distance >= 20;
  
    if (!isSecure) {
      context.fillStyle = '#EE3626';
  
      context.fillRect(currentFace.topLeft.x + 5, currentFace.topLeft.y + 5, 10, 10);
      context.fillRect(lastFace.topLeft.x + 5, lastFace.topLeft.y + 5, 10, 10);
  
      statusMessage.innerText = 'ALERTA: A distância entre as pessoas é menor que 1,5m!';
      isOk = false;
    }
  }

  if (isOk) {
    statusMessage.innerText = 'O distanciamento de 1,5m está sendo seguido :)';
  }
}

calcSocialDistancing();