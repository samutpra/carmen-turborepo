import { Injectable, Logger } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor() {}

  logger = new Logger(SupabaseService.name);

  SupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    this.logger.debug({
      file: SupabaseService.name,
      function: this.SupabaseClient.name,
      supabaseUrl: supabaseUrl,
      supabaseKey: supabaseKey,
    });

    return createClient(supabaseUrl, supabaseKey);
  }
}
