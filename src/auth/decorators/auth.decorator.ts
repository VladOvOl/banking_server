import { UseGuards } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

export const Auth = () => UseGuards(JwtModule)