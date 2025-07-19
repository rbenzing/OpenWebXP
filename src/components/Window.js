import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';

const Window = ({ id, x, y, onDelete }) => {
  return (
    <Draggable draggableId={id.toString()} index={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            position: 'absolute',
            top: y,
            left: x,
          }}
        >
          <Card>
            <CardHeader title={`Window ${id}`} />
            <CardContent>
              {/* Window Content */}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Close" onClick={() => onDelete(id)}>
                <Close />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Window;
