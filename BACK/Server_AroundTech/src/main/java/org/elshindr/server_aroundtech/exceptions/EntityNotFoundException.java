package org.elshindr.server_aroundtech.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * EntityNotFoundException
 * Réécriture du message pour l'exception http Not Found
 * Déclencher lorsqu'un id donné ne trouve pas l'objet correspondant
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(){
        super("Entité non trouvée! =(");
    }
}
