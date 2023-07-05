from django.db import models

class Pizza(models.Model):
    """
    Atributos de clase que son usadas por herencia de la clase Model

    """
    nombre  =  models.CharField(max_length=200)
    descripcion  = models.CharField(max_length=200)
    precio     = models.FloatField(blank=True, null=True)

    # podemos crear la tabla con un nombre especifico pero se lo tenemos
    # que indicar directamente en la metaclase

    class Meta:
        db_table = "table_pizza"


    def __str__(self):
        return f"La pizza: {self.nombre}, descripcion: {self.descripcion}, el precio: {self.precio}"

    def get_fields(self):
        return [
            (field.verbose_name, field.value_from_object(self))
            for field in self.__class__._meta.fields[1:]
            ]
