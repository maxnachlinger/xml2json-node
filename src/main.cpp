#include <string>
#include <iostream>
#include <napi.h>
#include "./include/xml2json.hpp"

Napi::Promise toJson(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::Promise::Deferred deferred = Napi::Promise::Deferred::New(info.Env());

  if (info.Length() != 1 || !info[0].IsString()) {
    deferred.Reject(
      Napi::TypeError::New(env, "Expected a string containing XML.").Value()
    );
    return deferred.Promise();
  }

  std::string xmlArg = info[0].As<Napi::String>();
  const char* xmlString = xmlArg.c_str();

  deferred.Resolve(Napi::String::New(env, xml2json(xmlString)));
  return deferred.Promise();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "toJson"), Napi::Function::New(env, toJson));
  return exports;
}

NODE_API_MODULE(xml2jsonnode, Init);
