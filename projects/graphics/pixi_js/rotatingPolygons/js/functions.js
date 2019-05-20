function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        'keydown', downListener, false
    );
    window.addEventListener(
        'keyup', upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener('keydown', downListener);
        window.removeEventListener('keyup', upListener);
    };

    return key;
}

function boxesIntersect(a, b) {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function updateGraphicProps(graphic, props) {
    const graphicsData = graphic.graphicsData;
    const keys = Object.keys(props);
    const jlen = keys.length;
    let i;
    let j;
    let ilen;
    let key;
    let shape;
    // Update the props on the graphic.
    for (j = 0; j < jlen; j++) {
      key = keys[j];
      graphic[key] = props[key];
    }
    // Update the props for each shape.
    for (i = 0, ilen = graphicsData.length; i < ilen; i++) {
      shape = graphicsData[i];
      for (j = 0; j < jlen; j++) {
        key = keys[j];
        shape[key] = props[key];
      }
    }
    graphic.dirty++;
    graphic.clearDirty++;
  }