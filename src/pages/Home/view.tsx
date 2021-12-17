import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface Props {}

const HomeView: React.FC<Props> = ({}) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      style={{
        width: "92vw",
        height: "100%",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          padding: "20px",
        }}
      >
        <Typography
          variant={"h2"}
          style={{
            marginBottom: "40px",
          }}
        >
          Hacemos tu dinero más inteligente.
        </Typography>
        <Typography>
          ¿Sabías que invertir es la única manera de evitar que tu dinero pierda
          valor en el tiempo?
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          padding: "0px 140px 0px 140px",
        }}
        xs={12}
      >
        <Typography
          style={{
            marginBottom: "40px",
          }}
        >
          En Grupo Bursátil Mexicano (GBM) tenemos más de 30 años de experiencia
          impulsando el máximo potencial de tu dinero. A lo largo de estos años,
          nos hemos dado cuenta que hacía falta una herramienta que le
          permitiera a todos los mexicanos tener su dinero disponible y
          creciendo con el tiempo.
        </Typography>
        <Typography>
          En GBM hemos sumado esfuerzos con la tecnología más avanzada y
          decidimos juntar todo en un mismo lugar para que alcances tus
          diferentes objetivos de inversión. Así es como nace GBM+.
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          padding: "0px 40px 0px 40px",
          marginTop: "20px",
        }}
        xs={12}
      >
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "30px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant={"h2"}
            style={{
              marginBottom: "30px",
            }}
          >
            ¿Por qué elegir GBM+?
          </Typography>
          <Typography
            style={{
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            Siéntete tranquilo, tu cuenta está respaldada por todo nuestro
            equipo de asesores y profesionales. Además, GBM está regulado por la
            Comisión Nacional Bancaria y de Valores (CNBV).
          </Typography>
          <Typography
            style={{
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            GBM es una casa de bolsa 100% mexicana y uno de los principales
            promotores de inversión, hemos sido reconocidos por la BMV gracias a
            nuestro récord de operación en el mercado en el 2020.
          </Typography>
          <Typography>
            En la app de GBM+ encontrarás herramientas específicas para tu
            ahorro, inversión a largo plazo o Trading para hacer tu dinero más
            inteligente.
          </Typography>
        </div>
      </Grid>
      <Typography>Para mas información da click en la imagen:</Typography>
    </Grid>
  );
};
export default HomeView;
