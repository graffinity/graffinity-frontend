import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Common.css";

export default function MultiActionAreaCard() {
  return (
    <Card
      className="card"
      sx={{
        mt: 8,
        mr: 8,
        ml: 8,
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardMedia
        sx={{ opacity: 1 }}
        component="img"
        image="assets/images/graf.png"
        alt="graf logo "
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center" }}
        >
          GRAFINITY UPLOAD YOUR BLALALALALALLALALA THEN OTHERS CAN
          BLALALALALALLA LORE BLA AND EXPLORE WILNO
        </Typography>
      </CardContent>
    </Card>
  );
}
