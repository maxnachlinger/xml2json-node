#include <string>
#include <iostream>
#include <napi.h>
#include "./include/xml2json.hpp"

Napi::Value toJson(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "Expected a string containing XML.")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string xmlArg = info[0].As<Napi::String>();
  const char* xmlString = xmlArg.c_str();

  return Napi::String::New(env, xml2json(xmlString));
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "toJson"), Napi::Function::New(env, toJson));
  return exports;
}

NODE_API_MODULE(xml2jsonnode, Init);
