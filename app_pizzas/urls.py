from django.urls import path
from .router import router


from .views import      PizzasListView   \
                    ,   PizzasDetailView \
                    ,   PizzasCreateView \
                    ,   PizzasUpdateView \
                    ,   PizzasDeleteView

app_name = "pizzas"

urlpatterns = [
    path("", PizzasListView.as_view(), name="all"),
    path("create/", PizzasCreateView.as_view(), name="create"),
    path("<int:pk>/detail/", PizzasDetailView.as_view(), name="detail"),
    path("<int:pk>/update/", PizzasUpdateView.as_view(), name="update"),
    path("<int:pk>/delete/", PizzasDeleteView.as_view(), name="delete")

]

urlpatterns += router.urls
