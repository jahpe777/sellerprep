#!/usr/bin/env python3
"""
Import development properties to production for james.y.higgs@gmail.com
"""

import os
import sys
import json
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.append('/Users/jameshiggs/Desktop/Projects/sellerprep/backend')

django.setup()

from django.contrib.auth.models import User
from core.models import Property, Section, Document, PropertyImage, Note

def import_properties():
    """Import properties from dev_properties_export.json"""

    # Load the exported data
    with open('dev_properties_export.json', 'r') as f:
        data = json.load(f)

    # Find or create the target user in production
    target_email = "james.y.higgs@gmail.com"
    try:
        target_user = User.objects.get(email=target_email)
        print(f"✓ Found existing user: {target_user.username} ({target_user.email})")
    except User.DoesNotExist:
        print(f"✗ User {target_email} not found in production!")
        print("Please create an account with this email first, then run this script again.")
        return False

    # Track created objects
    created_properties = 0
    created_sections = 0
    created_documents = 0
    created_images = 0
    created_notes = 0

    # Import the data
    for item in data:
        model_name = item['model']
        fields = item['fields']

        if model_name == 'core.property':
            # Check if property already exists
            if Property.objects.filter(address=fields['address'], owner=target_user).exists():
                print(f"  ⚠️  Property already exists: {fields['address']}")
                continue

            # Create property
            property_obj = Property.objects.create(
                owner=target_user,
                address=fields['address'],
                description=fields.get('description', ''),
                created_at=fields['created_at']
            )
            created_properties += 1
            print(f"  ✓ Created property: {property_obj.address}")

        elif model_name == 'core.section':
            # Find the property this section belongs to
            try:
                property_obj = Property.objects.get(
                    address__icontains=fields['property'][0].split(',')[0],  # Match partial address
                    owner=target_user
                )

                # Check if section already exists
                if Section.objects.filter(title=fields['title'], property=property_obj).exists():
                    print(f"    ⚠️  Section already exists: {fields['title']}")
                    continue

                section_obj = Section.objects.create(
                    property=property_obj,
                    title=fields['title'],
                    created_at=fields['created_at']
                )
                created_sections += 1
                print(f"    ✓ Created section: {section_obj.title}")

            except Property.DoesNotExist:
                print(f"    ✗ Could not find property for section: {fields['title']}")
                continue

    print(f"\n📊 Import Summary:")
    print(f"  Properties: {created_properties}")
    print(f"  Sections: {created_sections}")
    print(f"  Documents: {created_documents}")
    print(f"  Images: {created_images}")
    print(f"  Notes: {created_notes}")

    return True

if __name__ == "__main__":
    print("🚀 Starting data import...")
    print("=" * 50)

    success = import_properties()

    if success:
        print("\n✅ Import completed successfully!")
        print("Your development properties have been transferred to production.")
    else:
        print("\n❌ Import failed. Please check the errors above.")