
import React, { useRef, useEffect, useState } from 'react';
import { SimulationState } from './QuantumVacuumSimulation';

interface QuantumFieldProps {
  state: SimulationState;
  isRunning: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  chirality: number;
}

export const QuantumField: React.FC<QuantumFieldProps> = ({ state, isRunning, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.max(50, state.coherence);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    initParticles();
  }, [state.coherence]);

  const createParticle = (): Particle => {
    const chirality = state.chirality;
    const energy = state.energy / 100;
    
    return {
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * energy * 2,
      vy: (Math.random() - 0.5) * energy * 2,
      size: Math.random() * 3 + 1,
      color: getChiralColor(chirality),
      alpha: Math.random() * 0.8 + 0.2,
      life: Math.random() * 100 + 50,
      chirality: chirality,
    };
  };

  const getChiralColor = (chirality: number): string => {
    const intensity = Math.abs(chirality);
    if (chirality > 0) {
      // Right-handed circular polarization (red-orange)
      return `hsl(${20 + intensity * 20}, 80%, ${50 + intensity * 30}%)`;
    } else if (chirality < 0) {
      // Left-handed circular polarization (blue-cyan)
      return `hsl(${200 + intensity * 20}, 80%, ${50 + intensity * 30}%)`;
    } else {
      // Linear polarization (purple)
      return `hsl(280, 60%, 60%)`;
    }
  };

  const drawMirrors = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimensions;
    const spacing = (state.mirrorSpacing / 100) * width * 0.3;
    const angle = (state.mirrorAngle * Math.PI) / 180;
    
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Left mirror
    const leftX = width * 0.2;
    const leftY = height * 0.5;
    const mirrorLength = height * 0.6;
    
    ctx.save();
    ctx.translate(leftX, leftY);
    ctx.rotate(-angle);
    ctx.beginPath();
    ctx.moveTo(0, -mirrorLength / 2);
    ctx.lineTo(0, mirrorLength / 2);
    ctx.stroke();
    ctx.restore();
    
    // Right mirror
    const rightX = leftX + spacing;
    
    ctx.save();
    ctx.translate(rightX, leftY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -mirrorLength / 2);
    ctx.lineTo(0, mirrorLength / 2);
    ctx.stroke();
    ctx.restore();
    
    // Draw cavity region indicator
    if (state.topologicalPhase) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(leftX - 20, leftY - mirrorLength / 2, spacing + 40, mirrorLength);
      ctx.setLineDash([]);
    }
  };

  const drawMaterial = (ctx: CanvasRenderingContext2D) => {
    if (state.insertedMaterial === 'none') return;
    
    const { width, height } = dimensions;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const materialSize = 40;
    
    // Material appearance changes based on topological phase
    if (state.topologicalPhase) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.strokeStyle = '#10b981';
    } else {
      ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
      ctx.strokeStyle = '#6b7280';
    }
    
    ctx.lineWidth = 2;
    ctx.fillRect(centerX - materialSize / 2, centerY - materialSize / 2, materialSize, materialSize);
    ctx.strokeRect(centerX - materialSize / 2, centerY - materialSize / 2, materialSize, materialSize);
    
    // Add material label
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(state.insertedMaterial, centerX, centerY + materialSize / 2 + 15);
  };

  const drawMagneticField = (ctx: CanvasRenderingContext2D) => {
    if (state.magneticField < 0.1) return;
    
    const { width, height } = dimensions;
    const fieldStrength = state.magneticField;
    const direction = (state.fieldDirection * Math.PI) / 180;
    
    ctx.strokeStyle = `rgba(239, 68, 68, ${fieldStrength})`;
    ctx.lineWidth = 1;
    
    // Draw field lines
    for (let i = 0; i < 10; i++) {
      const x = (width / 11) * (i + 1);
      const startY = height * 0.2;
      const endY = height * 0.8;
      
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(direction) * 10, startY);
      ctx.lineTo(x + Math.cos(direction) * 10, endY);
      ctx.stroke();
      
      // Add arrow heads
      const arrowSize = 5;
      const arrowX = x + Math.cos(direction) * 10;
      const arrowY = startY + (endY - startY) * 0.5;
      
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize, arrowY - arrowSize);
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + arrowSize, arrowY - arrowSize);
      ctx.stroke();
    }
  };

  const updateParticles = () => {
    const { width, height } = dimensions;
    
    particlesRef.current.forEach((particle, index) => {
      // Apply chiral motion
      const chiralForce = state.chirality * 0.01;
      particle.vx += chiralForce * Math.sin(particle.y * 0.01);
      particle.vy += chiralForce * Math.cos(particle.x * 0.01);
      
      // Apply magnetic field effects
      const magneticForce = state.magneticField * 0.05;
      const fieldDirection = (state.fieldDirection * Math.PI) / 180;
      particle.vx += magneticForce * Math.cos(fieldDirection);
      particle.vy += magneticForce * Math.sin(fieldDirection);
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Boundary conditions (cavity confinement)
      if (particle.x < 0 || particle.x > width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > height) particle.vy *= -0.8;
      
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));
      
      // Update life and alpha
      particle.life--;
      particle.alpha = (particle.life / 150) * (state.coherence / 100);
      
      // Regenerate dead particles
      if (particle.life <= 0) {
        particlesRef.current[index] = createParticle();
      }
      
      // Update color based on current chirality
      particle.color = getChiralColor(state.chirality);
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = particle.color;
      
      // Add glow effect for high energy states
      if (state.energy > 50) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
      }
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw particle trails for high coherence
      if (state.coherence > 70) {
        ctx.globalAlpha = particle.alpha * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x - particle.vx * 2, particle.y - particle.vy * 2, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (isRunning) {
      updateParticles();
    }
    
    drawMagneticField(ctx);
    drawMirrors(ctx);
    drawParticles(ctx);
    drawMaterial(ctx);
    
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 400;
        setDimensions({ width: rect.width, height: 400 });
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)' }}
    />
  );
};
