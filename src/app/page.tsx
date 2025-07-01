"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      alert("请至少选择一种字符类型");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: "弱", color: "text-red-500", bg: "bg-red-500" };
    if (score <= 4) return { level: "中", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { level: "强", color: "text-green-500", bg: "bg-green-500" };
  };

  const strength = password ? getPasswordStrength() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            密码生成器
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            生成安全可靠的密码，保护您的账户安全
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>生成密码</CardTitle>
            <CardDescription>
              自定义密码设置，生成符合您需求的强密码
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 密码显示区域 */}
            <div className="space-y-2">
              <Label htmlFor="password">生成的密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  placeholder="点击生成密码按钮"
                  className="pr-20 font-mono text-lg"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!password}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!password}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {copied && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  密码已复制到剪贴板！
                </p>
              )}
              {strength && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">密码强度:</span>
                  <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.level}
                  </span>
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.bg} transition-all duration-300`}
                      style={{
                        width: strength.level === "弱" ? "33%" : strength.level === "中" ? "66%" : "100%"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 密码长度 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="length">密码长度</Label>
                <span className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {length[0]}
                </span>
              </div>
              <Slider
                id="length"
                value={length}
                onValueChange={setLength}
                min={4}
                max={64}
                step={1}
                className="w-full"
              />
            </div>

            {/* 字符类型选择 */}
            <div className="space-y-4">
              <Label>字符类型</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={setIncludeUppercase}
                  />
                  <Label htmlFor="uppercase" className="text-sm">
                    大写字母 (A-Z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={setIncludeLowercase}
                  />
                  <Label htmlFor="lowercase" className="text-sm">
                    小写字母 (a-z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                  />
                  <Label htmlFor="numbers" className="text-sm">
                    数字 (0-9)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                  />
                  <Label htmlFor="symbols" className="text-sm">
                    特殊符号 (!@#$...)
                  </Label>
                </div>
              </div>
            </div>

            {/* 生成按钮 */}
            <Button
              onClick={generatePassword}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              生成密码
            </Button>
          </CardContent>
        </Card>

        {/* 密码安全提示 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">密码安全提示</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>• 使用至少 12 个字符的密码</li>
              <li>• 包含大小写字母、数字和特殊符号</li>
              <li>• 不要在多个账户使用相同密码</li>
              <li>• 定期更换重要账户的密码</li>
              <li>• 考虑使用密码管理器存储密码</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
