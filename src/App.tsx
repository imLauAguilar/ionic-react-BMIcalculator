import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert,
  IonFooter,
} from "@ionic/react";

// import { peopleCircleOutline } from "ionicons/icons";

import BmiControls from "./components/BmiControls";
import BmiResults from "./components/BmiResults";
import InputControls from "./components/InputControls";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [metric, setMetric] = useState<"mkg" | "ftlbs">("mkg");

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please enter valid (non-negative) input number.");
      return;
    }

    const weightConversionFactor = metric === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = metric === "ftlbs" ? 3.28 : 1;
    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectMetricHandler = (selectValue: "mkg" | "ftlbs") => {
    setMetric(selectValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        header={"Invalid Input"}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI CALCULATOR</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControls
                  selectedValue={metric}
                  onSelectValue={selectMetricHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color='primary'>
                    Your Height ({metric === "mkg" ? "Meters" : "Feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>                  
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color='primary'>
                    Your Weight ({metric === "mkg" ? "Kg" : "lbs"}){" "}
                  </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBmi && <BmiResults result={calculatedBmi} />}
          </IonGrid>
        </IonContent>

        <IonFooter>
          <IonToolbar className="ion-no-border">
            <IonTitle size='small'>...dLAUb...</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
