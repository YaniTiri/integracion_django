/*Este fue un intento de usar la API quizapi.io utilizando vue.js para hacer el cuestionario. A diferencia de la api de opentdb, 
quizapi.io almacena preguntas de opciones multiples el usuario debe marcar la correcta en un casillero. Si bien pudimos hacerla 
funcionar, arrojaba codigo 404 muy frecuentemente. 
Ademas no pudimos traducir al español las preguntas y respuestas por que el traductor gratuito que utilizamos 
api.mymemory.translated.net arrojaba un objeto que nos costo interpretar*.
PARA QUE FUNCIONE HAY QUE REEMPLAZAR LA CADENA "YOUR_API_KEY" POR LA CLAVE API SUMINISTRADA POR QUIZAPI PARA CADA USUARIO*/

new Vue({
    el: '#app',
    data: {
      questions: [],
      userAnswers: {},
      showingQuiz: false
    },
    methods: {
      showQuiz() {
        this.showingQuiz = true;
        this.getQuestions();
      },
      getQuestions() {
        var API_URL = 'https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&difficulty=Medium&limit=3&tags=HTML,JavaScript,MySQL';
        axios.get(API_URL)
          .then(response => {
            this.questions = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      submitAnswers() {
        var API_URL = 'https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&difficulty=Medium&limit=3&tags=HTML,JavaScript,MySQL';
        axios.get(API_URL)
          .then(response => {
            var questions = response.data;
            var correctAnswers = questions.map(question => question.correct_answer);

            var userAnswersArray = Object.values(this.userAnswers);
            if (userAnswersArray.length === questions.length && userAnswersArray.every((answer, index) => answer === correctAnswers[index])) {
              // Respuestas correctas, muestra el código aleatorio
              var codigo = Math.floor(Math.random() * 90000) + 10000;
              alert('¡Excelente! Tu código de descuento es: ' + codigo);
            } else {
              // Al menos una respuesta incorrecta, redirige a una página web
              alert('no te precupes, si no te  segui este link:' );
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  });

  /*------------------------------------------------------------------------------------------------------------------------
  Para ejecutar esete scrip habria que modificar la seccion cuestionario en index.html de la siguente manera:

  1. Remover lineas desde la 82 a la 92

  2. Modificar linea 81 de la siguente manera: 
 <button class="light-btn" id="miBoton" onmouseover="cambiarTexto('Hacer el quiz')" onmouseout="cambiarTexto('DALE GAS!!!')" @click="showQuiz"">DALE GAS!!!</button>

  3. Agregar el cuerionario de opciones multiples debajo la linea 81:

 <div id="app">
    <h1>Cuestionario</h1>
    <div v-if="showingQuiz">
      <div v-if="questions.length === 0">
        <p>Cargando preguntas...</p>
      </div>
      <div v-else>
        <div v-for="question in questions" :key="question.id">
          <h3>{{ question.question }}</h3>
          <ul>
            <li v-for="(answer, key) in question.answers" :key="key">
              <label>
                <input type="radio" :name="question.id" :value="key" v-model="userAnswers[question.id]">
                {{ answer }}
              </label>
            </li>
          </ul>
        </div>
        <button @click="submitAnswers">Enviar respuestas</button>
      </div>
    </div>
  </div>*/
