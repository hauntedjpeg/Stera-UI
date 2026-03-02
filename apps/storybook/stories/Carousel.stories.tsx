import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext, Card, CardContent,
} from "@arc/ui";

const meta: Meta<typeof Carousel> = {
  title: "Arc UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
