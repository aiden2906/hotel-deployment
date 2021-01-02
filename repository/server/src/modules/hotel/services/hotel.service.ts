/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewCreateDto } from 'src/modules/review/dtos/review.dto';
import { ReviewService } from 'src/modules/review/services/review.service';
import { HotelQueryDto } from '../dtos/hotel-query.dto';
import {
  AddReviewDto,
  HotelCreateDto,
  HotelUpdateDto,
} from '../dtos/hotel.dto';
import { Hotel } from '../models/hotel.entity';
import { HotelRepository } from '../repositories/hotel.repository';

@Injectable()
export class HotelService {
  constructor(
    private readonly hotelRepository: HotelRepository,
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewService: ReviewService,
  ) {}

  async get(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.getByIdWithRelation(id);
    if (!hotel) {
      throw new NotFoundException('Not found hotel');
    }
    return hotel;
  }

  async create(args: HotelCreateDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(args);
    return this.hotelRepository.save(hotel);
  }

  async list(query: HotelQueryDto): Promise<any> {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const {ownerId, provinceId, districtId, wardId, name} = query;
    const filter: any = { isDeleted: false };
    if (ownerId) {
      filter.ownerId = ownerId;
    }
    if (provinceId) {
      filter.provinceId = provinceId;
    }
    if (districtId) {
      filter.districtId = districtId;
    }
    if (wardId) {
      filter.wardId = wardId;
    }
    if (name) {
      filter.name = name;
    }
    const [data, total] = await this.hotelRepository.list(filter, page, perpage);
    return {
      page: query.page || 0,
      perpage: query.perpage || 50,
      data,
      total,
    };
  }

  async update(id: number, args: HotelUpdateDto) {
    const { name, address, provinceId, districtId, images, description, wardId } = args;
    const hotel = await this.hotelRepository.getById(id);
    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    hotel.description = description || hotel.description;
    hotel.provinceId = provinceId || hotel.provinceId;
    hotel.districtId = districtId || hotel.districtId;
    hotel.wardId = wardId || hotel.wardId;
    hotel.images = images || hotel.images;
    return this.hotelRepository.save(hotel);
  }

  async review(id: number, customerId: number, args: AddReviewDto) {
    const { tagId, content, rating, images } = args;
    const hotel = await this.get(id);
    const reviewDto: ReviewCreateDto = {
      hotelId: hotel.id,
      customerId,
      tagId,
      content,
      rating,
      images,
    };
    const review = await this.reviewService.create(reviewDto);
    this.updateRating(hotel.id);
    return review;
  }

  async delete(id: number) {
    const hotel = await this.hotelRepository.getById(id);
    hotel.isDeleted = true;
    return this.hotelRepository.save(hotel);
  }

  async checkPermission(id: number, userId: number) {
    const hotel = await this.get(id);
    if (hotel.ownerId !== userId) {
      return false;
    }
    return true;
  }

  async updateRating(id: number) {
    const hotel = await this.get(id);
    hotel.rating = hotel.reviews.reduce((cur, i) => cur + i.rating, 0) / hotel.reviews.length;
    return this.hotelRepository.save(hotel);
  }

async updateMinPrice(id: number) {
    const hotel = await this.get(id);
    hotel.minPrice = Math.min(...hotel.rooms.map(r => r.salePrice));
    return this.hotelRepository.save(hotel);
  }
}
