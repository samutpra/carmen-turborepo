import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  logger = new Logger(AuthService.name);

  async createUser(createUserDto: { email: string; password: string }) {
    if (!createUserDto || !createUserDto.email || !createUserDto.password) {
      throw new HttpException(
        'Email and password must be provided.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.debug({
      file: AuthService.name,
      function: this.createUser.name,
      createUserDto: createUserDto,
    });

    const supabase = this.supabaseService.SupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    if (error) {
      this.logger.error({
        file: AuthService.name,
        function: this.createUser.name,
        error: error,
      });
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const user_obj = await this.prisma.tb_user.create({
      data: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.email,
        is_active: true,
        consent_at: data.user.user_metadata.consent_at,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
      },
    });

    return user_obj;
  }

  async login(loginDto: { email: string; password: string }) {
    const supabase = this.supabaseService.SupabaseClient();

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
