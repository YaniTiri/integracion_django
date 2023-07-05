from django.views.generic import TemplateView

class PizzeriaView(TemplateView):
    template_name = "index.html"