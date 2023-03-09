import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: window.innerHeight,
  },
  page: {
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
  section: {
    height: '100%',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20',
    backgroundColor: 'white',
    borderRadius: 20,
    color: 'black',
    fontSize: '28',
  },
  image: {
    width: 120,
  },
  recipeTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 80,
    fontSize: 42,
    fontFamily: 'Helvetica-BoldOblique',
  },
  cards: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  ingredientsCard: {
    flexDirection: 'column',
    fontSize: 12,
    width: 220,
    minHeight: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF5',
    borderRadius: 15,
    borderTop: 1,
    borderBottom: 1,
    borderColor: '#DAA520',
    color: '#4C4C4C',
  },
  nutritionCard: {
    flexDirection: 'column',
    fontSize: 12,
    width: 220,
    minHeight: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF5',
    borderRadius: 15,
    borderTop: 1,
    borderBottom: 1,
    borderColor: '#DAA520',
    color: '#4C4C4C',
  },
  ingredientsCardTitle: {
    borderBottom: 1,
    borderColor: '#DAA520',
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  nutritionCardTitle: {
    borderBottom: 1,
    borderColor: '#DAA520',
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  cardContent: {
    flexGrow: 1,
    marginVertical: 10,
  },
  cardFooter: {
    fontSize: 8,
  },
});

const PdfDocument = () => {

  return (

    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.brand}>
              <Image style={styles.image} src="./images/bon-appetit-bistro-logo.png" />
              <Text>Bon Appetit Bistro</Text>
            </View>

            <View style={styles.recipeTitle}>
              <Text>nume reteta</Text>
            </View>

            <View style={styles.cards}>
              <View style={styles.ingredientsCard}>
                <View style={styles.ingredientsCardTitle}>
                  <Text>Ingrediente</Text>
                </View>
                <Text style={styles.cardContent}>Lista de ingrediente...</Text>
                <Text style={styles.cardFooter}>*Ingrediente pentru 1 portie reteta</Text>
              </View>
              <View style={styles.nutritionCard}>
                <View style={styles.nutritionCardTitle}>
                  <Text>Valori nutritionale</Text>
                </View>
                <Text style={styles.cardContent}>Lista de nutrienti...</Text>
                <Text style={styles.cardFooter}>*Valori nutritionale pentru 100 grame reteta</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>


  );
};

export default PdfDocument;
