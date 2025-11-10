import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import './FloorPlan.css'; // Importing the CSS for styling

const rooms = [
  { id: 1, name: 'Room A', x: 50, y: 50, width: 120, height: 80, booked: false },
  { id: 2, name: 'Room B', x: 200, y: 50, width: 120, height: 80, booked: true },
  { id: 3, name: 'Room C', x: 50, y: 150, width: 120, height: 80, booked: false },
  { id: 4, name: 'Room D', x: 200, y: 150, width: 120, height: 80, booked: false },
];

const FloorPlan = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="floor-plan-container">
      <Stage width={400} height={400}>
        <Layer>
          {rooms.map((room) => (
            <React.Fragment key={room.id}>
              <Rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={room.booked ? '#FF6347' : '#3CB371'} // Tomato for booked, MediumSeaGreen for available
                shadowColor="black"
                shadowBlur={10}
                shadowOffset={{ x: 5, y: 5 }}
                shadowOpacity={0.5}
                cornerRadius={10} // Rounded corners
                onClick={() => handleRoomClick(room)}
                className={`room ${room.booked ? 'booked' : 'available'}`} // Adding classes for styling
              />
              <Text
                x={room.x + 10}
                y={room.y + 30}
                text={room.name}
                fontSize={20}
                fill="white"
                fontStyle="bold"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
      {selectedRoom && (
        <div className="room-details">
          <h2>{selectedRoom.name}</h2>
          <p>Status: {selectedRoom.booked ? 'Booked' : 'Available'}</p>
          <button className="book-button">Book Room</button>
        </div>
      )}
    </div>
  );
};

export default FloorPlan;