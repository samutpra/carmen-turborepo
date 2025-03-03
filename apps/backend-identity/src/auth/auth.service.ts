import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: { email: string; password: string }) {
    if (!createUserDto || !createUserDto.email || !createUserDto.password) {
      throw new HttpException(
        'Email and password must be provided.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.signUp({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const user_obj = await this.prisma.tb_user.create({
      data: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.email,
        is_active: true,
        consent: data.user.user_metadata.consent,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
      },
    });

    return user_obj;
  }

  async login(loginDto: { email: string; password: string }) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
