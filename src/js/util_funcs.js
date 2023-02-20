function draw_image_line(ctx,tileSize,image,start,end,size=0.5,spacing=1) {
    let dx = end.x-start.x;
    let dy = end.y-start.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let angle = Math.atan2(dx, dy);

    for (let z=0; (z<=distance || z==0); z+=tileSize*size*spacing) {
        let x = start.x + (Math.sin(angle) * z);
        let y = start.y + (Math.cos(angle) * z);
        ctx.translate(x,y)
        ctx.rotate(angle)
        ctx.drawImage(image,-0.5*size*tileSize,-0.5*size*tileSize,size*tileSize,size*tileSize)
        ctx.rotate(-angle)
        ctx.translate(-x,-y)
    }
}