"use client";
import { Container } from "react-bootstrap";
import { HeaderComponent } from "./components/header/header.component";
import { WeatherSearch } from "./components/weather-search/weather-search.component";

export default function HomePage() {
  return (
    <Container fluid className="pb-5">
      <HeaderComponent
        title="Skydevs Weather Service"
        id="header"
        dataTest="page-header"
      />
      <WeatherSearch />
    </Container>
  );
}
