import { useState } from 'react';

export default function useTourSteps(initialSteps = []) {
  const [steps, setSteps] = useState(initialSteps);

  const addStep = (step) => setSteps([...steps, { ...step, id: Date.now() }]);
  const editStep = (idx, newStep) => setSteps(steps.map((s, i) => (i === idx ? { ...s, ...newStep } : s)));
  const removeStep = (idx) => setSteps(steps.filter((_, i) => i !== idx));
  const reorderSteps = (startIdx, endIdx) => {
    const updated = Array.from(steps);
    const [removed] = updated.splice(startIdx, 1);
    updated.splice(endIdx, 0, removed);
    setSteps(updated);
  };

  return { steps, addStep, editStep, removeStep, reorderSteps, setSteps };
} 