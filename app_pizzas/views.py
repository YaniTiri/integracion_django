#from django.shortcuts import render
from django.urls import reverse_lazy

from django.views import View

from django.views.generic.list import ListView
from django.views.generic.edit import DeleteView, UpdateView, CreateView
from django.views.generic.detail import DetailView

from .models    import Pizza

class PizzeriaBaseView(View):
    template_name = "pizzas.html"
    model = Pizza
    fields = "__all__"
    success_url = reverse_lazy("pizzas:all")

class PizzasListView(PizzeriaBaseView, ListView):
    ...
    
    
    
class PizzasDetailView(PizzeriaBaseView, DetailView):
    template_name = "pizza_detail.html"
   
    
class PizzasCreateView(PizzeriaBaseView, CreateView):
    template_name = "pizza_create.html"
    extra_context = {
        "tipo": "Crear pizza"
     }

class PizzasUpdateView(PizzeriaBaseView, UpdateView):
    template_name = "pizza_create.html"
    extra_context = {
       "tipo": "Actualizar pizza"
    }
class PizzasDeleteView(PizzeriaBaseView, DeleteView):
    template_name = "pizza_delete.html"
    extra_context = {
        "tipo": "Borrar pizza"
    } 