import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import Story from "../base/Story";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Stories = () => {
    const [story, setStory] = useState<Array<{ name: string, avatar: string }>>([]);

    useEffect(() => {
        const newStories = Array.from({ length: 20 }, () => ({
            name: faker.person.firstName(),
            avatar: faker.image.avatar(),
        }));
        setStory(newStories);
    }, [])
    
    return (
        <ul className="flex items-center justify-center mx-auto w-96 md:w-full h-28 md:pl-5 mt-16 ">
            <Swiper
                spaceBetween={40}
                slidesPerView={7}
                breakpoints={
                    {
                        0: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 25,
                        },
                    }
                }
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="w-full relative z-0"
            >
                {story.map((item, index) => (
                    <SwiperSlide key={index} className="min-w-10 min-h-10">
                        <Story content={item} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </ul>
    );
};

export default Stories;
