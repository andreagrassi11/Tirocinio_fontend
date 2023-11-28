import React, { useEffect, useRef } from 'react';

interface Props {
  treeData: any
}

const GraphDin = ({ treeData }:Props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rootX = 50;
    const rootY = canvas.height / 2;

    drawTree(ctx, treeData, rootX, rootY, 300, 0);
  }, [treeData]);

  const drawTree = (ctx:any, node:any, x:any, y:any, dx:any, depth:any) => {
    const nodeRadius = 30;
    // Your logic to draw each node
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    console.log(node);
    if(node.drawEdge)
      ctx.fillStyle = '#cfaf6c';
    else
      ctx.fillStyle = '#b5b5b5';
    ctx.fill();
    ctx.stroke();

    // Draw lines connecting nodes
    if (node.children && node.children.length > 0) {
      const newX = x + 300;
      const yOffset = 200;

      node.children.forEach((child:any, index:any) => {
          const newY = y - yOffset + (index * yOffset * 2) / (node.children.length - 1);
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(newX, newY);
          if(child.drawEdge) 
            ctx.strokeStyle = '#d19515';
          else
            ctx.strokeStyle = '#757575'; 
          ctx.stroke();
    
          drawTree(ctx, child, newX, newY, dx / 2, depth + 1);

      });
    }
  };

  return <canvas ref={canvasRef} width={window.innerWidth} height={800}/>;
};

export default GraphDin;