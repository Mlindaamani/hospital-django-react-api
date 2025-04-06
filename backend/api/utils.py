from .choices import SpecializationChoice


def bill_amount_by_specialization(specialization): 
    """Return the amount based on the specialization."""
    if specialization == SpecializationChoice.CARDIOLOGY:
        return 200
    elif specialization == SpecializationChoice.NEUROLOGY:
        return 150
    elif specialization == SpecializationChoice.ORTHOPEDICS:
        return 180
    elif specialization == SpecializationChoice.PEDIATRICS:
        return 120
    elif specialization == SpecializationChoice.DERMATOLOGY:
        return 130
    elif specialization == SpecializationChoice.GENERAL_MEDICINE:
        return 100
    elif specialization == SpecializationChoice.GYNECOLOGY:
        return 160
    elif specialization == SpecializationChoice.PSYCHIATRY:
        return 140
    elif specialization == SpecializationChoice.RADIOLOGY:
        return 170
    else:
        return 100