const image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const statusMessage = document.querySelector('.status');

const FACES = [];

async function findFaces() {
  const model = await blazeface.load();
  const predictions = await model.estimateFaces(image, false);

  if (predictions.length > 0) {
    statusMessage.innerText = 'Isso é o que conseguimos :)';

    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');

    context.fillStyle = 'rgba(250, 225, 6, 0.5)';

    for (let index = 0; index < predictions.length; index++) {
      const start = predictions[index].topLeft;
      const end = predictions[index].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      context.fillRect(start[0], start[1], size[0], size[1]);

      FACES.push({
        topLeft: { x: start[0], y: start[1], },
        bottomRight: { x: end[0], y: end[1], },
      });
    }
  } else {
    statusMessage.innerText = 'Ops, nenhum rosto encontrado :(';
  }

  return FACES;
}