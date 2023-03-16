import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          nutriscore: {
            description: {
              firstParagraph:
                'The Nutri-Score, also known as the 5-Colour Nutrition label or 5-CNL, is a five-colour nutrition label and nutritional rating system, and an attempt to simplify the nutritional rating system demonstrating the overall nutritional value of food products. It assigns products a rating letter from A(best) to E(worst), with associated colors from green to red.',
              secondParagraph:
                'This system was selected by the French government in March 2017 to be displayed on food products after it was compared against several labels proposed by industry or retailers. The system relies on the computation of a nutrient profiling system derived from the United Kingdom Food Standards Agency nutrient profiling system (FSA score). It was created by Santé Publique France, the French public health agency, based on the work of Serge Hercberg from Sorbonne Paris North University. Other bodies involved in the development of the system included the Agency for Food, Environmental and Occupational Health and Safety (ANSES) and the High Council for Public Health (HCSP).',
              thirdParagraph:
                "The system has been recommended by other European Union countries as well as the European Commission and the World Health Organization. Due to the system's methodology, its implementation for general use is controversial in some EU countries.",
              source: 'Source',
              button: 'Got it, thanks!',
            },
          },
          recipeList: {
            title: 'Bon Appetit Bistro',
            subtitle: 'Manage Recipes',
            header: {
              name: 'Name',
              qty: 'Quantity (grams)',
              cal: 'Calories',
              ntrs: 'Nutriscore',
              date: 'Date',
              action: 'Action',
            },
            createButton: 'Create New Recipe',
            searchInput: 'Search',
          },
          filterColumns: {
            title: 'Filter Columns',
            allFilters: 'Toggle all',
          },
          recipesOption: {
            openBtn: 'View',
            removeBtn: 'Remove',
          },
          createRecipe: {
            saveBtn: 'Save',
            discardBtn: 'Discard and close',
          },
          editRecipe: {
            description:
              'To create a new recipe, please type in all the information below.',
            firstLabel: 'Recipe Name',
            placeholder: 'Recipe Name...',
            secondLabel: 'Search Ingredients',
            placeholderSecond: 'Search...',
            nothingFound: 'Nothing found',
            noIngredientsAlert: 'No ingredients selected!',
            ingredientsList: 'List of Ingredients:',
            details: {
              title: 'Recipe Details',
              ingredientsPerServing: 'Ingredients for 1 serving of',
              defaultRecipeName: 'Undefined Recipe Name',
              table: {
                column1: 'Ingredient',
                column2: 'grams',
                noIngredient: 'No ingredient selected',
              },
              totalQuantity: 'Total quantity',
              nutrition: 'Nutrition Facts (per 100 grams)',
              calories: 'Calories',
              fat: 'Fat',
              saturatedFat: 'Saturated fat',
              carbohydrates: 'Carbohydrates',
              sugar: 'Sugar',
              proteins: 'Proteins',
              salt: 'Salt',
              additives: 'Additives',
              noAdditivesFound: 'no additives found',
            },
            updateButton: 'Update',
            discardButton: 'Discard my changes',
          },
          userPage: {
            title: 'User Page',
          },
          settingsPage: {
            title: 'Settings Page',
            translateButton: 'Translate',
            language: 'Select Language:',
            themeSwitcher: 'Set Theme:',
          },
          ingredient: {
            calories: 'Calories',
            nutriments: 'Nutriments',
            additives: 'Additives',
            infoUnavailable: 'Unavailable info',
            inputPlaceholder: 'quantity...',
            brand: 'Brand',
            source: 'Source',
          },
        },
      },
      ro: {
        translation: {
          nutriscore: {
            description: {
              firstParagraph:
                'Nutri-Score, cunoscut și sub numele de eticheta nutrițională în 5 culori sau 5-CNL, este o etichetă nutrițională în cinci culori și un sistem de evaluare nutrițională, precum și o încercare de a simplifica sistemul de evaluare nutrițională care demonstrează valoarea nutrițională globală a produselor alimentare. Acesta atribuie produselor o literă de rating de la A (cel mai bun) la E (cel mai rău), cu culori asociate de la verde la roșu.',
              secondParagraph:
                'Acest sistem a fost selectat de guvernul francez în martie 2017 pentru a fi afișat pe produsele alimentare, după ce a fost comparat cu mai multe etichete propuse de industrie sau de retaileri. Sistemul se bazează pe calculul unui sistem de profilare a nutrienților derivat din sistemul de profilare a nutrienților al Agenției pentru standarde alimentare din Regatul Unit (scorul FSA). Acesta a fost creat de Santé Publique France, agenția franceză de sănătate publică, pe baza lucrărilor lui Serge Hercberg de la Universitatea Sorbona Paris Nord. Alte organisme implicate în dezvoltarea sistemului au fost Agenția pentru Sănătate și Siguranță Alimentară, de Mediu și Profesională (ANSES) și Înaltul Consiliu pentru Sănătate Publică (HCSP).',
              thirdParagraph:
                'Sistemul a fost recomandat de alte țări din Uniunea Europeană, precum și de Comisia Europeană și de Organizația Mondială a Sănătății. Din cauza metodologiei sistemului, punerea sa în aplicare pentru uz general este controversată în unele țări ale UE.',
              source: 'Sursă',
              button: 'Am înteles, mulțumesc!',
            },
          },
          recipeList: {
            title: 'Bon Appetit Bistro',
            subtitle: 'Gestionare Rețete',
            header: {
              name: 'Nume',
              qty: 'Cantitate (grame)',
              cal: 'Calorii',
              ntrs: 'Nutriscore',
              date: 'Data',
              action: 'Acțiune',
            },
            createButton: 'Creare Rețetă Nouă',
            searchInput: 'Căutare',
          },
          filterColumns: {
            title: 'Filtrează Coloanele',
            allFilters: 'Comută toate',
          },
          recipesOption: {
            openBtn: 'Deschide',
            removeBtn: 'Șterge',
          },
          createRecipe: {
            saveBtn: 'Salvează',
            discardBtn: 'Renunță și închide',
          },
          editRecipe: {
            description:
              'Pentru a crea o rețetă nouă, vă rugăm să introduceți toate informațiile de mai jos.',
            firstLabel: 'Nume Rețetă',
            placeholder: 'Nume...',
            secondLabel: 'Căutare Ingrediente',
            placeholderSecond: 'Caută...',
            nothingFound: 'Niciun ingredient găsit',
            noIngredientsAlert: 'Niciun ingredient selectat!',
            ingredientsList: 'Lista de Ingrediente:',
            details: {
              title: 'Detalii Rețetă',
              ingredientsPerServing: 'Ingrediente pentru 1 porție de',
              defaultRecipeName: 'Nume rețetă nedefinit',
              table: {
                column1: 'Ingredient',
                column2: 'grame',
                noIngredient: 'Niciun ingredient selectat',
              },
              totalQuantity: 'Cantitate totală',
              nutrition: 'Valori nutriționale (pentru 100 grame)',
              calories: 'Calorii',
              fat: 'Grăsimi',
              saturatedFat: 'Grăsimi saturate',
              carbohydrates: 'Carbohidrați',
              sugar: 'Zaharuri',
              proteins: 'Proteine',
              salt: 'Sare',
              additives: 'Aditivi',
              noAdditivesFound: 'niciun aditiv găsit',
            },
            updateButton: 'Actualizare',
            discardButton: 'Renunță la modificări',
          },
          userPage: {
            title: 'Pagină Client',
          },
          settingsPage: {
            title: 'Setări',
            language: 'Selectează Limba',
            theme: {
              title: 'Set Theme:',
              mode: 'Light / Dark',
            },
          },
          ingredient: {
            calories: 'Calorii',
            nutriments: 'Nutrienți',
            additives: 'Aditivi',
            infoUnavailable: 'Informație indisponibilă',
            inputPlaceholder: 'cantitatea...',
            brand: 'Marcă',
            source: 'Sursa',
          },
        },
      },
    },
  });

export default i18n;
