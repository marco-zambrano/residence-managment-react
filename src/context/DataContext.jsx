import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

const initialRooms = [
  {
    id: 1,
    numero: "101",
    edificio: "Edificio A",
    piso: "Piso 1",
    precio: 350,
    estado: "ocupada",
    detalles: "Amoblada, con baño privado.",
    estudianteAsignado: "Juan Pérez",
  },
  {
    id: 2,
    numero: "102",
    edificio: "Edificio A",
    piso: "Piso 1",
    precio: 280,
    estado: "disponible",
    detalles: "Amoblada, baño compartido.",
    estudianteAsignado: "",
  },
  {
    id: 3,
    numero: "201",
    edificio: "Edificio B",
    piso: "Piso 2",
    precio: 400,
    estado: "disponible",
    detalles: "Amoblada, con balcón y baño privado.",
    estudianteAsignado: "",
  },
  {
    id: 4,
    numero: "202",
    edificio: "Edificio B",
    piso: "Piso 2",
    precio: 320,
    estado: "ocupada",
    detalles: "Amoblada, con vistas al jardín.",
    estudianteAsignado: "Ana López",
  },
  {
    id: 5,
    numero: "301",
    edificio: "Edificio C",
    piso: "Piso 3",
    precio: 450,
    estado: "disponible",
    detalles: "Estudio completo con cocina pequeña.",
    estudianteAsignado: "",
  },
];

const initialReservations = [
  {
    id: 1,
    estudiante: "María García",
    habitacion: "102",
    fechaSolicitud: "19/1/2024",
    duracion: "2 semestres",
    estado: "pendiente",
  },
  {
    id: 2,
    estudiante: "Pedro Martín",
    habitacion: "202",
    fechaSolicitud: "17/1/2024",
    duracion: "1 semestre",
    estado: "confirmada",
  },
  {
    id: 3,
    estudiante: "Laura Sánchez",
    habitacion: "301",
    fechaSolicitud: "21/1/2024",
    duracion: "1 semestre",
    estado: "pendiente",
  },
];

const initialStudents = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@universidad.edu",
    habitacion: "101",
    fechaIngreso: "2024-01-15",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Ana López",
    email: "ana.lopez@universidad.edu",
    habitacion: "202",
    fechaIngreso: "2024-02-01",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@universidad.edu",
    habitacion: "",
    fechaIngreso: "2024-08-20",
    estado: "pendiente",
  },
];

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [reservations, setReservations] = useState(initialReservations);
  const [students, setStudents] = useState(initialStudents);

  const addReservation = (reservation) => {
    setReservations([...reservations, { ...reservation, id: reservations.length + 1, estado: 'pendiente' }]);
  };

  const acceptReservation = (reservationId) => {
    setReservations(
      reservations.map((r) => {
        if (r.id === reservationId) {
          const room = rooms.find((room) => room.numero === r.habitacion);
          if (room) {
            setRooms(
              rooms.map((roomItem) =>
                roomItem.numero === r.habitacion
                  ? { ...roomItem, estado: 'ocupada', estudianteAsignado: r.estudiante }
                  : roomItem
              )
            );
            setStudents(
              students.map((student) =>
                student.nombre === r.estudiante
                  ? { ...student, habitacion: r.habitacion, estado: 'activo' }
                  : student
              )
            )
          }
          return { ...r, estado: 'confirmada' };
        }
        return r;
      })
    );
  };

  const deleteStudent = (studentId) => {
    setStudents(students.filter((s) => s.id !== studentId));
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const deleteRoom = (roomId) => {
    setRooms(rooms.filter((r) => r.id !== roomId));
  };

  const updateRoom = (updatedRoom) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const addRoom = (newRoom) => {
    setRooms([...rooms, { ...newRoom, id: rooms.length + 1 }]);
  }

  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
  }

  return (
    <DataContext.Provider
      value={{
        rooms,
        setRooms,
        reservations,
        setReservations,
        students,
        setStudents,
        addReservation,
        acceptReservation,
        deleteStudent,
        updateStudent,
        deleteRoom,
        updateRoom,
        addRoom,
        addStudent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
