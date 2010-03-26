#!/usr/bin/ruby1.8 -w
#
# Copyright:: Copyright 2009 Google Inc.
# Original Author:: Ryan Brown (mailto:ribrdb@google.com)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Custom types for App Engine

require 'dm-core/type' unless defined? DataMapper::Type::PROPERTY_OPTIONS

module DataMapper
  module Types
    class List < Type
      primitive ::Object

      def self.dump(value, property)
        value
      end
      
      def self.load(value, property)
        value.to_a if value
      end
      
      def self._type=(type)
        @type = type
      end
    end
    
    class AppEngineStringType < Type
      def self.dump(value, property)
        self::DATASTORE_TYPE.new(value) if value
      end
      
      def self.load(value, property)
        value
      end
    end
    
    class AppEngineNativeType < Type
      primitive ::Object
      
      def self.dump(value, property)
        value
      end
      
      def self.load(value, property)
        value
      end
    end
    
    class Blob < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::Blob
      size 1024 * 1024
    end
    
    class ByteString < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::ByteString
      size 500
    end
    
    class Link < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::Link
      size 2038
    end
    
    class Email < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::Email
      size 500
    end
    
    class Category < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::Category
      size 500
    end
    
    class PhoneNumber < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::PhoneNumber
      size 500
    end
    
    class PostalAddress < AppEngineStringType
      primitive String
      DATASTORE_TYPE = AppEngine::Datastore::PostalAddress
      size 500
    end
    
    class Rating < Type
      primitive ::Object
      
      def self.dump(value, property)
        AppEngine::Datastore::Rating.new(value) if value
      end
      
      def self.load(value, property)
        value.rating if value
      end
    end
    
    IMHandle = GeoPt = Key = User = AppEngineNativeType
    
    # TODO store user as email and id?
  end
end
