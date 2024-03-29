// App.jsx
import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container
} from 'reactstrap';
import NavBar from "./Navbar";
//import 'bootstrap/dist/css/bootstrap.css';


const items = [
  {
    src: 'https://wallpapercave.com/wp/wp1836639.jpg',
    altText: 'Slide 1',
    caption: 'Colorado'
  },
  {
    src: 'https://wallpapercave.com/wp/963aENk.jpg',
    altText: 'Slide 2',
    caption: 'Colorado'
  }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
        >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
      <NavBar/>
      <Container>
      <Carousel
      activeIndex={activeIndex}
      next={this.next}
      previous={this.previous}
      className="Homecarousel">
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </Container>
      </div>
    );
  }
}
