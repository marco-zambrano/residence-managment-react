"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
  habitacion,
}) {
  const [formData, setFormData] = useState({
    fechaIngreso: "",
    duracion: "",
    comentarios: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fechaIngreso: "",
        duracion: "",
        comentarios: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  if (!habitacion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Reservar Habitación
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de la habitación */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">
                Habitación {habitacion.numero}
              </h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Disponible
              </span>
            </div>

            <div className="space-y-3 text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-medium">Edificio:</span>
                <span>{habitacion.edificio}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Ubicación:</span>
                <span>{habitacion.piso}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Precio:</span>
                <span className="font-bold">${habitacion.precio}/mes</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-medium">Incluye:</span>
                <span className="text-right">
                  {habitacion.servicios.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fechaIngreso">Fecha de Ingreso:</Label>
              <Input
                id="fechaIngreso"
                type="date"
                value={formData.fechaIngreso}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fechaIngreso: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion">Duración del alojamiento:</Label>
              <Select
                value={formData.duracion}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, duracion: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona duración" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-semestre">1 semestre</SelectItem>
                  <SelectItem value="2-semestres">2 semestres</SelectItem>
                  <SelectItem value="3-semestres">3 semestres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comentarios">Comentarios adicionales:</Label>
              <Textarea
                id="comentarios"
                value={formData.comentarios}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    comentarios: e.target.value,
                  }))
                }
                placeholder="Alguna solicitud especial..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button type="submit" className="bg-slate-800 hover:bg-slate-700">
                Confirmar Reserva
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
