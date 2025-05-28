import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TourStep from './TourStep';

const TourEditor = ({ steps, onAddStep, onEditStep, onRemoveStep, onReorderSteps, onPreview }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorderSteps(result.source.index, result.destination.index);
  };

  return (
    <div className="glass-card p-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Tour Editor</h2>
        <button
          className="btn-primary"
          onClick={onAddStep}
          aria-label="Add Step"
        >
          Add Step
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <ol className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {steps.map((step, idx) => (
                <Draggable key={step.id} draggableId={step.id.toString()} index={idx}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`glass-card flex items-center justify-between p-4 transition-shadow ${snapshot.isDragging ? 'soft-shadow' : ''}`}
                    >
                      <div className="flex-1 min-w-0">
                        <TourStep step={step} />
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button className="btn-secondary" onClick={() => onEditStep(idx)} aria-label="Edit Step">Edit</button>
                        <button className="btn-secondary bg-red-500 hover:bg-red-600 text-white" onClick={() => onRemoveStep(idx)} aria-label="Remove Step">Remove</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className="btn-primary mt-6 w-full"
        onClick={onPreview}
        aria-label="Preview Tour"
      >
        Preview Tour
      </button>
    </div>
  );
};

export default TourEditor; 