import React from "react";
import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";

import { calculatorOutline, refreshCircleOutline } from "ionicons/icons";

const BmiControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = (props) => {
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonButton expand="block" color="primary" fill="solid" onClick={props.onCalculate}>
          <IonIcon slot="start" icon={calculatorOutline} />
          Calculate
        </IonButton>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonButton expand="block" color="primary" fill="solid" onClick={props.onReset}>
          <IonIcon slot="start" icon={refreshCircleOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;
